// import React, { useState, useEffect } from "react";
// import { Modal, Spin, message, Row, Col, Input, Button, Space } from "antd";
// import classNames from "classnames/bind";
// import styles from "./FilePreviewModal.module.scss";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faDownload } from "@fortawesome/free-solid-svg-icons";
// import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
// import { API_ENDPOINTS, apiGet } from "@/api";

// const cx = classNames.bind(styles);

// export interface FilePreviewModalProps {
//   visible: boolean;
//   onCancel: () => void;
//   filename: string;
//   fileId?: string | number;
//   ngayVanBan?: string;
//   loaiVanBan?: string;
//   fileType?: "pdf" | "image" | "unknown";
//   localFile?: File | null;
//   isShowThongTinThem?: boolean;
// }

// const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
//   visible,
//   onCancel,
//   filename,
//   fileId,
//   ngayVanBan,
//   loaiVanBan,
//   localFile,
//   isShowThongTinThem = true,
// }) => {
//   const [loading, setLoading] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState<string>("");

//   // API function để tải file xuống
//   const downloadFile = async (FileId: string | number, fileName: string) => {
//     try {
//       const params = { FileId: FileId };
//       const res = await apiGet(
//         API_ENDPOINTS.HO_TRO_VIEC_LAM.DOWNLOAD_FILE,
//         params,
//         {
//           responseType: "blob",
//         }
//       );

//       let blob: Blob;
//       const downloadFileName = fileName || `file_${FileId}.pdf`;

//       if (res instanceof Blob) {
//         blob = res;
//       } else if (res.data instanceof Blob) {
//         blob = res.data;
//       } else if (res.succeeded && res.data) {
//         const fileData = res.data;
//         if (fileData instanceof ArrayBuffer) {
//           blob = new Blob([fileData], { type: "application/pdf" });
//         } else {
//           blob = new Blob([fileData], { type: "application/pdf" });
//         }
//       } else {
//         message.error("Không thể tải file");
//         return;
//       }

//       // Tạo URL và download
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = downloadFileName;
//       document.body.appendChild(link);
//       link.click();

//       // Cleanup
//       document.body.removeChild(link);
//       URL.revokeObjectURL(url);

//       message.success("Tải file thành công!");
//     } catch (error) {
//       console.error("Lỗi download file:", error);
//       message.error("Có lỗi xảy ra khi tải file");
//     }
//   };

//   // API function để lấy file từ server
//   const fetchFileForPreview = async (
//     FileId: string | number
//   ): Promise<Blob | null> => {
//     try {
//        const params = { FileId: FileId };
//       const res = await apiGet(
//         API_ENDPOINTS.HO_TRO_VIEC_LAM.DOWNLOAD_FILE,
//         params,
//         {
//           responseType: "blob",
//         }
//       );

//       if (res instanceof Blob) {
//         return res;
//       } else if (res.data instanceof Blob) {
//         return res.data;
//       } else if (res.succeeded && res.data) {
//         const fileData = res.data;
//         if (fileData instanceof ArrayBuffer) {
//           return new Blob([fileData]);
//         } else {
//           return new Blob([fileData]);
//         }
//       }

//       return null;
//     } catch (error) {
//       console.error("Lỗi lấy file:", error);
//       message.error("Có lỗi xảy ra khi tải file");
//       return null;
//     }
//   };

//   const getFileType = (filename: string): "pdf" | "image" | "unknown" => {
//     const ext = filename.split(".").pop()?.toLowerCase();
//     if (ext === "pdf") return "pdf";
//     if (["jpg", "jpeg", "png", "gif", "bmp", "tiff"].includes(ext || ""))
//       return "image";
//     return "unknown";
//   };

//   useEffect(() => {
//     const loadFile = async () => {
//       if (visible) {
//         // Cleanup previous URL
//         if (previewUrl) {
//           URL.revokeObjectURL(previewUrl);
//           setPreviewUrl("");
//         }

//         // Ưu tiên preview file local
//         if (localFile) {
//           const url = URL.createObjectURL(localFile);
//           setPreviewUrl(url);
//           return;
//         }

//         // Nếu không có local file, load từ server
//         if (fileId) {
//           setLoading(true);
//           try {
//             const blob = await fetchFileForPreview(fileId);
//             if (blob) {
//               const url = URL.createObjectURL(blob);
//               setPreviewUrl(url);
//             }
//           } catch {
//             message.error("Không thể tải file để preview");
//           } finally {
//             setLoading(false);
//           }
//         }
//       }
//     };

//     loadFile();

//     // Cleanup URL khi component unmount
//     return () => {
//       if (previewUrl) {
//         URL.revokeObjectURL(previewUrl);
//       }
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [visible, fileId, localFile]);

//   const renderFilePreview = () => {
//     if (loading) {
//       return (
//         <div className={cx("loading-container")}>
//           <Spin size="large" />
//           <p>Đang tải file...</p>
//         </div>
//       );
//     }

//     if (!previewUrl) {
//       return (
//         <div className={cx("empty-content")}>
//           <p>Hiển thị nội dung giấy tờ</p>
//         </div>
//       );
//     }

//     const detectedFileType = getFileType(filename);

//     if (detectedFileType === "pdf") {
//       return (
//         <div className={cx("pdf-container")}>
//           <embed
//             src={previewUrl}
//             type="application/pdf"
//             width="100%"
//             height="600px"
//             className={cx("pdf-embed")}
//           />
//         </div>
//       );
//     } else if (detectedFileType === "image") {
//       return (
//         <div className={cx("image-container")}>
//           <img
//             src={previewUrl}
//             alt="File preview"
//             className={cx("preview-image")}
//           />
//         </div>
//       );
//     } else {
//       return (
//         <div className={cx("unsupported-file")}>
//           <p>Định dạng file không được hỗ trợ xem trước</p>
//           <p>Vui lòng tải xuống để xem nội dung</p>
//         </div>
//       );
//     }
//   };

//   const renderFooter = () => {
//     const buttons = [];

//     buttons.push(
//       <Button
//         key="close"
//         icon={<FontAwesomeIcon icon={faCircleXmark} />}
//         onClick={onCancel}
//       >
//         Đóng
//       </Button>
//     );

//     return <Space>{buttons}</Space>;
//   };

//   return (
//     <Modal
//       title="Xem trước tài liệu"
//       open={visible}
//       footer={renderFooter()}
//       onCancel={onCancel}
//       width={900}
//       style={{ top: 20 }}
//       className={cx("file-preview-modal")}
//     >
//       <div className={cx("modal-content")}>
//         {/* Thông tin văn bản */}
//         {isShowThongTinThem && (
//           <Row gutter={16}>
//             <Col span={12}>
//               <div className={cx("info-field")}>
//                 <label>Ngày văn bản, tài liệu</label>
//                 <Input value={ngayVanBan} disabled />
//               </div>
//             </Col>
//             <Col span={12}>
//               <div className={cx("info-field")}>
//                 <label>Loại văn bản, tài liệu</label>
//                 <Input value={loaiVanBan} disabled />
//               </div>
//             </Col>
//           </Row>
//         )}

//         {/* Nội dung preview */}
//         <div style={{ marginTop: 16 }}>
//           <label className={cx("global-label-section")}>
//             <span>Nội dung tài liệu</span>
//               <Button
//                 style={{ height: 18 }}
//                 icon={<FontAwesomeIcon icon={faDownload} />}
//                 onClick={() => {
//                   if (localFile) {
//                     // Download file local
//                     const url = URL.createObjectURL(localFile);
//                     const link = document.createElement("a");
//                     link.href = url;
//                     link.download = filename || "file.pdf";
//                     document.body.appendChild(link);
//                     link.click();
//                     document.body.removeChild(link);
//                     URL.revokeObjectURL(url);
//                     message.success("Tải file thành công!");
//                   } else if (fileId) {
//                     downloadFile(fileId, filename);
//                   }
//                 }}
//                 disabled={!fileId && !localFile}
//               >
//                 Tải xuống
//               </Button>
//           </label>
//           {renderFilePreview()}
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default FilePreviewModal;
