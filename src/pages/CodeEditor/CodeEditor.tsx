import { useState } from 'react';
import Editor from '@monaco-editor/react';
import confetti from 'canvas-confetti';
import { Button, message } from 'antd';
import {
  PlayCircleFilled, CodeOutlined, BugOutlined,
  BulbOutlined, ReloadOutlined, CopyOutlined
} from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './CodeEditor.module.scss';

const cx = classNames.bind(styles);

const CodeEditor = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>(['> Ready to code.']);

  // CODE MẶC ĐỊNH: Chuyển về Console App để API dễ chạy và trả kết quả text
  const defaultCode = `using System;

public class Program
{
    public static void Main()
    {
        Console.WriteLine("Bat dau chay Code thuc te...");
        
        int a = 10;
        int b = 20;
        int sum = a + b;
        
        Console.WriteLine($"Tong cua {a} + {b} la: {sum}");
        
        if (sum > 25) {
            Console.WriteLine("Ket qua > 25. Logic if/else hoat dong tot!");
        }
        
        Console.WriteLine("Chay thanh cong!");
    }
}`;

  const [code, setCode] = useState(defaultCode);

  // --- HÀM BẮN PHÁO HOA ---
  const triggerConfetti = () => {
    const end = Date.now() + 1000;
    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#58a6ff', '#bc8cff', '#3fb950'] });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#58a6ff', '#bc8cff', '#3fb950'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  };

  // --- HÀM GỌI API ĐỂ CHẠY CODE THẬT ---
  const handleRun = async () => {
    if (!code.trim()) return;

    setIsRunning(true);
    setLogs(['> Compiling & Executing on Cloud...']); // Thông báo đang chạy

    try {
      // Gọi Piston API (Free Public API cho Code Execution)
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: 'csharp',
          version: '6.12.0', // Phiên bản .NET (Mono) mà Piston hỗ trợ
          files: [
            {
              content: code // Gửi code người dùng nhập vào
            }
          ]
        })
      });

      const data = await response.json();

      // Xử lý kết quả trả về
      if (data.run) {
        const output = data.run.output; // Kết quả in ra màn hình (stdout)
        const stderr = data.run.stderr; // Lỗi (nếu có)

        // Tách dòng để hiển thị đẹp
        const outputLines = output ? output.split('\n') : [];

        if (data.run.code === 0 && !stderr) {
          // CHẠY THÀNH CÔNG
          setLogs([
            '> Build succeeded.',
            '-----------------------',
            ...outputLines,
            '',
            '✨ Program exited with code 0.'
          ]);
          message.success('Chạy code thành công!');
          triggerConfetti(); // Bắn pháo hoa ăn mừng
        } else {
          // CÓ LỖI (Compile Error hoặc Runtime Error)
          setLogs([
            '> Build Failed / Runtime Error',
            '-----------------------',
            stderr || output || 'Unknown Error', // Ưu tiên hiển thị lỗi
            '',
            `Exited with code ${data.run.code}.`
          ]);
          message.error('Có lỗi xảy ra khi chạy code!');
        }
      }
    } catch (error) {
      setLogs(['> Error connecting to compiler server.', 'Please try again later.']);
      message.error('Lỗi kết nối server!');
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(defaultCode);
    setLogs(['> Code reset.', '> Ready.']);
  };

  return (
    <div className={cx('editor-container-wow', { running: isRunning })}>
      <div className={cx('inner-wrapper')}>

        {/* 1. GLASS HEADER */}
        <div className={cx('glass-header')}>
          <div className={cx('tabs-container')}>
            <div className={cx('fake-tab', 'active')}>
              <CodeOutlined /> Program.cs
            </div>
          </div>

          <div className={cx('header-actions')}>
            <span className={cx('ai-badge')}>Live Runner</span>
            <Button type="text" icon={<ReloadOutlined />} onClick={handleReset} style={{ color: '#fff' }} />
            <Button type="text" icon={<CopyOutlined />} style={{ color: '#fff' }} />
          </div>
        </div>

        {/* 2. BODY */}
        <div className={cx('editor-body')}>

          {/* EDITOR AREA */}
          <div className={cx('code-area')}>
            <Editor
              height="100%"
              defaultLanguage="csharp"
              theme="vs-dark"
              value={code}
              // QUAN TRỌNG: Cập nhật state khi người dùng gõ
              onChange={(value) => setCode(value || '')}
              options={{
                fontFamily: "'Fira Code', monospace",
                fontSize: 14,
                minimap: { enabled: true },
                padding: { top: 20 },
                lineNumbers: 'on',
                renderLineHighlight: 'all',
                automaticLayout: true,
              }}
            />

            {/* AI BUTTONS (Top Right như đã sửa) */}
            <div className={cx('floating-ai')}>
              <Button size="small" className={cx('btn-ai')} icon={<BulbOutlined />}>Explain</Button>
              <Button size="small" className={cx('btn-ai')} icon={<BugOutlined />}>Fix</Button>
            </div>
          </div>

          {/* TERMINAL AREA */}
          <div className={cx('glass-terminal')}>
            <div className={cx('term-head')}>
              <span>Console Output</span>
              <div className={cx('live-indicator', { on: isRunning })}></div>
            </div>
            <div className={cx('term-content')}>
              {logs.map((log, i) => (
                <div key={i} className={cx('line', {
                  'success-msg': log.includes('succeeded') || log.includes('thanh cong'),
                  'error-msg': log.includes('Failed') || log.includes('Error') || log.includes('❌')
                })}>
                  {log}
                </div>
              ))}
              {isRunning && <span style={{ color: '#58a6ff' }}>_</span>}
            </div>
          </div>
        </div>

        {/* 3. MEGA RUN BUTTON */}
        <div className={cx('run-overlay', { hidden: isRunning })}>
          <Button
            className={cx('mega-run-btn')}
            onClick={handleRun}
            loading={isRunning}
            icon={!isRunning && <PlayCircleFilled style={{ fontSize: 20 }} />}
          >
            {isRunning ? 'EXECUTING...' : 'RUN CODE'}
          </Button>
        </div>

      </div>
    </div>
  );
};

export default CodeEditor;