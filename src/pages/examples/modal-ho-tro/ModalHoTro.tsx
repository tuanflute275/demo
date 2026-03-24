// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useEffect, useState, useCallback } from "react";
// import {
//   Modal,
//   Form,
//   Button,
//   Space,
//   Input,
//   Row,
//   Col,
//   DatePicker,
//   Select,
//   InputNumber,
//   Radio,
//   Tooltip,
// } from "antd";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { type ModalQuanLyHoSoNguoiKhuyetTatProps } from "@/interfaces/ho-so.interface";
// import {
//   faCircleXmark,
//   faFile,
//   faFloppyDisk,
// } from "@fortawesome/free-regular-svg-icons";
// // import TabTaiLieu from "../tab-tai-lieu/TabTaiLieu";
// import classNames from "classnames/bind";
// import styles from "./ModalHoTro.module.scss";
// import { convertApiDateToDay } from "@/shared/utils/helper";
// import { toast } from "react-toastify";
// import {
//   VALIDATE_MESSAGES,
//   formatter,
// } from "@/shared/utils/constants";
// import { apiGet } from "@/api";
// import { API_ENDPOINTS } from "@/api/constants";
// import {
//   faSearch,
//   faEye,
//   faTrash,
//   faArrowUpFromBracket,
// } from "@fortawesome/free-solid-svg-icons";
// import FilePreviewModal from "../../file-preview-modal/FilePreviewModal";

// import type { RcFile } from "antd/es/upload/interface";
// import ModalTraCuu from "../modal-tra-cuu/ModalTraCuu";
// import type { DanhMucDungChung } from "@/interfaces/common.interface";

// const cx = classNames.bind(styles);
// const ModalHoTro: React.FC<ModalQuanLyHoSoNguoiKhuyetTatProps> = ({
//   open,
//   mode,
//   data,
//   onCancel,
//   onSubmit,
//   loading = false,
// }) => {
//   // Lấy form instance để theo dõi giá trị
//   const [form] = Form.useForm();
//   const [previewVisible, setPreviewVisible] = useState(false);
//   const [previewFileId, setPreviewFileId] = useState<string | number>("");
//   const [previewFilename, setPreviewFilename] = useState("");
//   const [previewLocalFile, setPreviewLocalFile] = useState<File | null>(null);
//   const [modalTraCuuVisible, setModalTraCuuVisible] = useState(false);
//   const [fileList, setFileList] = useState<
//     Array<{
//       id?: string;
//       tenFileDinhkem?: string;
//       file?: RcFile;
//       isFromApi?: boolean;
//     }>
//   >([]);
//   const [deletedFileIds, setDeletedFileIds] = useState<string[]>([]);
//   const isReadOnly = mode === "view";

//   // danh mục
//   const [dsLoaiHoTro, setDsLoaiHoTro] = useState<DanhMucDungChung[]>([]);
//   const [dsNguonHoTro, setDsNguonHoTro] = useState<DanhMucDungChung[]>([]);
//   const [dsTinhTrangViecLam, setDsTinhTrangViecLam] = useState<
//     DanhMucDungChung[]
//   >([]);
//   const [dsMoiTruongLamViec, setDsMoiTruongLamViec] = useState<
//     DanhMucDungChung[]
//   >([]);
//   const [dsNgheNghiep, setDsNgheNghiep] = useState<DanhMucDungChung[]>([]);

//   // Hàm reset form và tab sau khi đóng modal
//   const resetAfterClose = () => {
//     form.resetFields();
//     setPreviewVisible(false);
//     setPreviewLocalFile(null);
//     setFileList([]);
//     setDeletedFileIds([]);
//     // Reset danh sách quận/huyện về empty object
//   };

//   const handleSubmit = async () => {
//     try {
//       const values = await form.validateFields();

//       // Kiểm tra xem đã chọn hồ sơ chưa
//       if (!values.maHoso) {
//         toast.error("Vui lòng chọn hồ sơ");
//         return;
//       }

//       // Convert dayjs objects back to string format cho API
//       const processedValues = {
//         ...values,
//       };

//       if (mode === "edit" && data?.hotroId) {
//         processedValues.hotroId = data.hotroId;
//       }

//       // Thêm danh sách file mới được upload
//       const newUploadedFiles = fileList.filter(
//         (item) => item.file && !item.isFromApi
//       );
//       if (newUploadedFiles.length > 0) {
//         processedValues.fileDinhkem = newUploadedFiles.map((item) => item.file); // Array of File objects
//       }

//       // Thêm danh sách ID file đã xóa
//       if (deletedFileIds.length > 0) {
//         processedValues.idsFiletoDelete = deletedFileIds;
//       }

//       onSubmit(processedValues);
//     } catch {
//       toast.error("Vui lòng kiểm tra lại các trường thông tin");
//     }
//   };

//   const handleCancel = () => {
//     resetAfterClose();
//     onCancel();
//   };

//   const getModalTitle = () => {
//     switch (mode) {
//       case "create":
//         return "Thêm mới thông tin hỗ trợ việc làm ";
//       case "edit":
//         return "Cập nhật thông tin hỗ trợ việc làm ";
//       case "view":
//         return "Xem chi tiết thông tin hỗ trợ việc làm";
//       default:
//         return "Thông tin việc làm";
//     }
//   };

//   // Custom footer with buttons based on mode
//   const renderFooter = () => {
//     const buttons = [];

//     // Mode-specific custom buttons
//     if (mode === "view") {
//       buttons.push(
//         <Button
//           icon={<FontAwesomeIcon icon={faCircleXmark} />}
//           key="close"
//           onClick={handleCancel}
//         >
//           Hủy
//         </Button>
//       );
//     } else if (mode === "create") {
//       // Create mode: Save Draft + Cancel + Create
//       // Chỉ hiển thị nút Lưu khi không ở tab Tài liệu
//       buttons.push(
//         <Button
//           key="submit"
//           type="primary"
//           icon={<FontAwesomeIcon icon={faFloppyDisk} />}
//           loading={loading}
//           onClick={handleSubmit}
//         >
//           Lưu
//         </Button>
//       );
//       buttons.push(
//         <Button
//           icon={<FontAwesomeIcon icon={faCircleXmark} />}
//           key="cancel"
//           onClick={handleCancel}
//         >
//           Hủy
//         </Button>
//       );
//     } else if (mode === "edit") {
//       // Chỉ hiển thị nút Lưu khi không ở tab Tài liệu
//       buttons.push(
//         <Button
//           key="submit"
//           type="primary"
//           icon={<FontAwesomeIcon icon={faFloppyDisk} />}
//           loading={loading}
//           onClick={handleSubmit}
//         >
//           Lưu
//         </Button>
//       );
//       buttons.push(
//         <Button
//           icon={<FontAwesomeIcon icon={faCircleXmark} />}
//           key="cancel"
//           onClick={handleCancel}
//         >
//           Đóng
//         </Button>
//       );
//     }

//     return <Space>{buttons}</Space>;
//   };

//   // Load đơn vị tiếp nhận on component mount
//   useEffect(() => {
//     if (open) {
//       // loadDanhSachDonViTiepNhan();
//     }
//   }, [open]);

//   // Reset form và tab khi modal opens/closes hoặc data changes
//   useEffect(() => {
//     if (open && data && (mode === "edit" || mode === "view")) {
//       // Load đơn vị tiếp nhận để có thể hiển thị giá trị đã chọn
//       const mappedData = {
//         ...data,
//         // Convert các date field cụ thể
//         ngaySinh: data.ngaySinh ? convertApiDateToDay(data.ngaySinh) : null,
//         ngayBatdauLamviec: data.ngayBatdauLamviec
//           ? convertApiDateToDay(data.ngayBatdauLamviec)
//           : null,
//         ngayBatdau: data.ngayBatdau
//           ? convertApiDateToDay(data.ngayBatdau)
//           : null,
//         ngayKetthuc: data.ngayKetthuc
//           ? convertApiDateToDay(data.ngayKetthuc)
//           : null,
//         // Đảm bảo donviNhanMa được map đúng
//         mucDoKhuyetTatTen: data.mucdoKhuyettat,
//         dangKhuyetTatTen: data.dangKhuyettat,
//         hoTen: data.hoten,
//         hosoId: data.hosoId,
//       };

//       // Load existing files from data into combined fileList
//       if (data.fileDinhkems && Array.isArray(data.fileDinhkems)) {
//         // Handle array of files from API
//         const apiFiles = data.fileDinhkems.map((file: any) => ({
//           id: file.fileId?.toString() || file.id?.toString(),
//           tenFileDinhkem: file.tenFileDinhkem,
//           isFromApi: true,
//         }));
//         setFileList(apiFiles);
//       } else if (data.tenFileDinhkem && data.idFile) {
//         // Handle single file (backward compatibility)
//         setFileList([
//           {
//             id: data.idFile.toString(),
//             tenFileDinhkem: data.tenFileDinhkem,
//             isFromApi: true,
//           },
//         ]);
//       } else if (
//         data.tenFileDinhkem &&
//         typeof data.tenFileDinhkem === "string"
//       ) {
//         // Fallback for cases where only filename is available
//         setFileList([
//           {
//             tenFileDinhkem: data.tenFileDinhkem,
//             isFromApi: true,
//           },
//         ]);
//       }

//       try {
//         form.setFieldsValue(mappedData);
//       } catch (error) {
//         console.error("Error setting form values:", error);
//       }
//     } else if (open && mode === "create") {
//       resetAfterClose(); // Reset form và tab khi tạo mới
//     } else if (!open) {
//       // Reset khi modal đóng
//       resetAfterClose();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [open, data, mode, form]);

//   // #region Khởi tạo các api danh mục 1 lần
//   const layDanhSachLoaiHoTro = async () => {
//     // try {
//     //   const res = await apiGet(API_ENDPOINTS.LOAI_HO_TRO_VIEC_LAM.LIST);
//     //   if (res.succeeded) {
//     //     return res.data;
//     //   }
//     //   console.error("Lấy danh sách loại hỗ trợ thất bại:", res.message || res);
//     // } catch (error) {
//     //   console.error("Lỗi lấy danh sách loại hỗ trợ:", error);
//     // }
//     return [];
//   };

//   const layDanhSachNguonHoTro = async () => {
//     // try {
//     //   const res = await apiGet(API_ENDPOINTS.NGUON_HO_TRO_VIECLAM.LIST);
//     //   if (res.succeeded) {
//     //     return res.data;
//     //   }
//     //   console.error("Lấy danh sách nguồn hỗ trợ thất bại:", res.message || res);
//     // } catch (error) {
//     //   console.error("Lỗi lấy danh sách nguồn hỗ trợ:", error);
//     // }
//     return [];
//   };

//   const layDanhSachTinhTrangViecLam = async () => {
//     // try {
//     //   const res = await apiGet(API_ENDPOINTS.TINH_TRANG_HO_TRO_VIEC_LAM.LIST);
//     //   if (res.succeeded) {
//     //     return res.data;
//     //   }
//     //   console.error(
//     //     "Lấy danh sách tình trạng việc làm thất bại:",
//     //     res.message || res
//     //   );
//     // } catch (error) {
//     //   console.error("Lỗi lấy danh sách tình trạng việc làm:", error);
//     // }
//     return [];
//   };

//   const layDanhSachMoiTruongLamViec = async () => {
//     // try {
//     //   const res = await apiGet(API_ENDPOINTS.MOI_TRUONG_LAM_VIEC.LIST);
//     //   if (res.succeeded) {
//     //     return res.data;
//     //   }
//     //   console.error(
//     //     "Lấy danh sách môi trường làm việc thất bại:",
//     //     res.message || res
//     //   );
//     // } catch (error) {
//     //   console.error("Lỗi lấy danh sách môi trường làm việc:", error);
//     // }
//     return [];
//   };

//   const layDanhSachNgheNghiep = async () => {
//     // try {
//     //   const res = await apiGet(API_ENDPOINTS.NGHE_NGHIEP.LIST);
//     //   if (res.succeeded) {
//     //     return res.data;
//     //   }
//     //   console.error("Lấy danh sách nghề nghiệp thất bại:", res.message || res);
//     // } catch (error) {
//     //   console.error("Lỗi lấy danh sách nghề nghiệp:", error);
//     // }
//     return [];
//   };

//   // Hàm gọi tất cả API lần đầu
//   const onCallApiLanDau = useCallback(async () => {
//     try {
//       // Gọi tất cả API song song và destructure kết quả trực tiếp
//       const [
//         danhSachLoaiHoTro,
//         danhSachNguonHoTro,
//         danhSachTinhTrangViecLam,
//         danhSachMoiTruongLamViec,
//         danhSachNgheNghiep,
//       ] = await Promise.all([
//         layDanhSachLoaiHoTro(),
//         layDanhSachNguonHoTro(),
//         layDanhSachTinhTrangViecLam(),
//         layDanhSachMoiTruongLamViec(),
//         layDanhSachNgheNghiep(),
//       ]);

//       setDsLoaiHoTro(danhSachLoaiHoTro);
//       setDsNguonHoTro(danhSachNguonHoTro);
//       setDsTinhTrangViecLam(danhSachTinhTrangViecLam);
//       setDsMoiTruongLamViec(danhSachMoiTruongLamViec);
//       setDsNgheNghiep(danhSachNgheNghiep);
//     } catch (error) {
//       console.error("Lỗi khi gọi API lần đầu:", error);
//       throw error;
//     }
//   }, []);

//   useEffect(() => {
//     onCallApiLanDau();
//   }, [onCallApiLanDau]);
//   // endregion

//   // Preview function is now handled in uploadProps.onPreview

//   const handlePreviewCancel = () => {
//     setPreviewVisible(false);
//     setPreviewFileId("");
//     setPreviewFilename("");
//     setPreviewLocalFile(null);
//   };

//   const handleSelect = (selectedData: any) => {
//     // Fill dữ liệu vào form
//     form.setFieldsValue({
//       hosoId: selectedData.id,
//       maHoso: selectedData.maHoSo,
//       hoTen: selectedData.hoten,
//       soDinhdanh: selectedData.soDinhDanh,
//       mucDoKhuyetTatTen: selectedData.mucDoKhuyetTatTen,
//       dangKhuyetTatTen: selectedData.dangKhuyetTatTen,
//       ngaySinh: selectedData.ngaySinh
//         ? convertApiDateToDay(selectedData.ngaySinh)
//         : null,
//       noHNTinhThanh: selectedData.noHNTinhThanh,
//       noHNXa: selectedData.noHNXa,
//       noHNChiTiet: selectedData.noHNChiTiet,
//       gioiTinh: selectedData.gioiTinh,
//     });

//     setModalTraCuuVisible(false);
//     toast.success("Đã chọn thông tin thành công");
//   };
//   // Handle file upload (both drag-drop and click)
//   const handleFileUpload = (files: File[]) => {
//     files.forEach((file) => {
//       // Validation
//       const allowedTypes = [
//         "application/pdf",
//         "image/jpeg",
//         "image/jpg",
//         "image/png",
//         "image/gif",
//         "image/bmp",
//         "image/webp",
//       ];

//       if (!allowedTypes.includes(file.type)) {
//         toast.error(`File ${file.name}: Chỉ hỗ trợ file PDF và ảnh!`);
//         return;
//       }

//       if (file.size / 1024 / 1024 > 10) {
//         toast.error(`File ${file.name}: Kích thước phải < 10MB!`);
//         return;
//       }

//       // Add to combined file list
//       setFileList((prev) => [
//         ...prev,
//         {
//           file: file as RcFile,
//           isFromApi: false,
//         },
//       ]);
//     });
//   };

//   return (
//     <>
//       <Modal
//         className={cx("modal-quan-ly-ho-so-nguoi-khuyet-tat")}
//         title={getModalTitle()}
//         open={open}
//         onCancel={handleCancel}
//         footer={renderFooter()}
//         afterClose={resetAfterClose}
//         width={1030}
//         style={{ top: 20 }}
//         forceRender
//         loading={open && (mode === "edit" || mode === "view") && !data}
//       >
//         <Form form={form} layout="vertical" disabled={isReadOnly}>
//           <label className={cx("global-label-section")}>
//             <span>Thông tin</span>

//             {mode === "create" && (
//               <Button
//                 icon={<FontAwesomeIcon icon={faSearch} />}
//                 type="primary"
//                 onClick={() => {
//                   setModalTraCuuVisible(true);
//                 }}
//               >
//                 Tra cứu thông tin
//               </Button>
//             )}
//           </label>
//           <Form.Item name="hosoId" hidden>
//             <Input />
//           </Form.Item>
//           <Row gutter={10}>
//             <Col span={8}>
//               <Form.Item name="maHoso" label="Mã hồ sơ">
//                 <Input disabled />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item name="hoTen" label="Họ và tên">
//                 <Input disabled />
//               </Form.Item>
//             </Col>

//             <Col span={8}>
//               <Form.Item name="soDinhdanh" label="Số DDCN/CCCD/CMND của">
//                 <Input disabled />
//               </Form.Item>
//             </Col>

//             <Col span={8}>
//               <Form.Item name="ngaySinh" label="Ngày tháng năm sinh ">
//                 <DatePicker
//                   format={{
//                     format: "DD/MM/YYYY",
//                     type: "mask" as const,
//                   }}
//                   style={{ width: "100%" }}
//                   disabled
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item name="mucDoKhuyetTatTen" label="1">
//                 <Input disabled />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item name="dangKhuyetTatTen" label="2">
//                 <Input disabled />
//               </Form.Item>
//             </Col>
//           </Row>
//           <label className="global-label-section">Thông tin hỗ trợ</label>
//           <Row gutter={10}>
//             <Col span={8}>
//               <Form.Item
//                 name="loaiHotroMa"
//                 label="Loại hỗ trợ"
//                 rules={[
//                   { required: true, message: VALIDATE_MESSAGES.required },
//                 ]}
//               >
//                 <Select placeholder="Chọn loại hỗ trợ" disabled={isReadOnly}>
//                   {dsLoaiHoTro.map((item) => (
//                     <Select.Option key={item.value} value={item.value}>
//                       {item.label}
//                     </Select.Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col span={16}>
//               <Form.Item name="noiDungHotro" label="Nội dung hỗ trợ">
//                 <Input
//                   disabled={isReadOnly}
//                   placeholder="Nhập nội dung hỗ trợ"
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={16}>
//               <Form.Item name="donviThuchien" label="Đơn vị thực hiện hỗ trợ">
//                 <Input
//                   disabled={isReadOnly}
//                   placeholder="Nhập đơn vị thực hiện hỗ trợ"
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item label="Nguồn hỗ trợ" name="nguonHotroMa">
//                 <Select placeholder="Chọn nguồn hỗ trợ" disabled={isReadOnly}>
//                   {dsNguonHoTro.map((item) => (
//                     <Select.Option key={item.value} value={item.value}>
//                       {item.label}
//                     </Select.Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item label="Mức hỗ trợ" name="mucHotro">
//                 <InputNumber
//                   formatter={formatter}
//                   parser={(value) =>
//                     value?.replace(/\./g, "") as unknown as number
//                   }
//                   suffix="VND"
//                   min={0}
//                   style={{ width: "100%" }}
//                   placeholder="Nhập mức hỗ trợ"
//                   disabled={isReadOnly}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item
//                 name="ngayBatdau"
//                 label="Thời gian được hỗ trợ từ ngày"
//                 rules={[
//                   {
//                     validator: (_, value) => {
//                       const ngayKetthuc = form.getFieldValue("ngayKetthuc");
//                       if (
//                         value &&
//                         ngayKetthuc &&
//                         value.isAfter(ngayKetthuc, "day")
//                       ) {
//                         return Promise.reject(
//                           new Error(
//                             "Ngày bắt đầu hưởng không được lớn hơn ngày kết thúc hưởng"
//                           )
//                         );
//                       }
//                       return Promise.resolve();
//                     },
//                   },
//                 ]}
//               >
//                 <DatePicker
//                   format={{
//                     format: "DD/MM/YYYY",
//                     type: "mask" as const,
//                   }}
//                   style={{ width: "100%" }}
//                   disabled={isReadOnly}
//                   disabledDate={(current) => {
//                     const ngayKetthuc = form.getFieldValue("ngayKetthuc");
//                     if (!ngayKetthuc) return false;
//                     return current && current.isAfter(ngayKetthuc, "day");
//                   }}
//                   onChange={() => {
//                     // Trigger validation for ngayKetthuc when ngayBatdau changes
//                     form.validateFields(["ngayKetthuc"]);
//                   }}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item
//                 name="ngayKetthuc"
//                 label="Thời gian được hỗ trợ đến ngày"
//                 rules={[
//                   {
//                     validator: (_, value) => {
//                       const ngayBatdau = form.getFieldValue("ngayBatdau");
//                       if (
//                         value &&
//                         ngayBatdau &&
//                         value.isBefore(ngayBatdau, "day")
//                       ) {
//                         return Promise.reject(
//                           new Error(
//                             "Ngày kết thúc hưởng không được nhỏ hơn ngày bắt đầu hưởng"
//                           )
//                         );
//                       }
//                       return Promise.resolve();
//                     },
//                   },
//                 ]}
//               >
//                 <DatePicker
//                   format={{
//                     format: "DD/MM/YYYY",
//                     type: "mask" as const,
//                   }}
//                   style={{ width: "100%" }}
//                   disabled={isReadOnly}
//                   disabledDate={(current) => {
//                     const ngayBatdau = form.getFieldValue("ngayBatdau");
//                     if (!ngayBatdau) return false;
//                     return current && current.isBefore(ngayBatdau, "day");
//                   }}
//                   onChange={() => {
//                     // Trigger validation for ngayBatdau when ngayKetthuc changes
//                     form.validateFields(["ngayBatdau"]);
//                   }}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item
//                 rules={[
//                   { required: true, message: VALIDATE_MESSAGES.required },
//                 ]}
//                 label="Kết quả hỗ trợ"
//                 name="ketquaHotro"
//               >
//                 <Select placeholder="Chọn kết quả hỗ trợ" disabled={isReadOnly}>
//                   {/* {TRANG_THAI_HO_TRO_VIEC_LAM_OPTIONS.map((option) => (
//                     <Select.Option key={option.value} value={option.value}>
//                       {option.label}
//                     </Select.Option>
//                   ))} */}
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col span={16}>
//               <Form.Item label="Ghi chú" name="tthtGhiChu">
//                 <Input placeholder="Nhập ghi chú" disabled={isReadOnly} />
//               </Form.Item>
//             </Col>
//             <Col span={24}>
//               <Form.Item name="fileDinhkem" label="File tài liệu liên quan">
//                 {/* Custom Upload Area */}
//                 {!isReadOnly && (
//                   <div
//                     className={cx("custom-upload-area")}
//                     style={{
//                       background: "#fafafa",
//                       border: "1px dashed #d9d9d9",
//                       borderRadius: "6px",
//                       padding: "20px",
//                       textAlign: "center",
//                       cursor: "pointer",
//                       marginBottom: "16px",
//                       transition: "all 0.3s ease",
//                     }}
//                     onClick={() => {
//                       const input = document.createElement("input");
//                       input.type = "file";
//                       input.accept = ".pdf,.jpg,.jpeg,.png,.gif,.bmp,.webp";
//                       input.multiple = true;
//                       input.onchange = (e) => {
//                         const files = (e.target as HTMLInputElement).files;
//                         if (files) {
//                           handleFileUpload(Array.from(files));
//                         }
//                       };
//                       input.click();
//                     }}
//                     onDragOver={(e) => {
//                       e.preventDefault();
//                       e.stopPropagation();
//                       e.currentTarget.style.background = "#e6f7ff";
//                       e.currentTarget.style.borderColor = "#1890ff";
//                     }}
//                     onDragLeave={(e) => {
//                       e.preventDefault();
//                       e.stopPropagation();
//                       e.currentTarget.style.background = "#fafafa";
//                       e.currentTarget.style.borderColor = "#d9d9d9";
//                     }}
//                     onDrop={(e) => {
//                       e.preventDefault();
//                       e.stopPropagation();
//                       e.currentTarget.style.background = "#fafafa";
//                       e.currentTarget.style.borderColor = "#d9d9d9";

//                       const files = Array.from(e.dataTransfer.files);
//                       if (files.length > 0) {
//                         handleFileUpload(files);
//                       }
//                     }}
//                   >
//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         gap: "16px",
//                         color: "#8C8C8C",
//                       }}
//                     >
//                       <FontAwesomeIcon
//                         icon={faArrowUpFromBracket}
//                         style={{ fontSize: "16px", color: "#212529" }}
//                       />
//                       <div style={{ textAlign: "left" }}>
//                         <p
//                           style={{
//                             margin: 0,
//                             fontSize: "14px",
//                             fontWeight: 500,
//                           }}
//                         >
//                           Kéo thả tại đây hoặc{" "}
//                           <span
//                             style={{
//                               color: "#1890ff",
//                               textDecoration: "underline",
//                             }}
//                           >
//                             Tải lên
//                           </span>
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Combined File List */}
//                 <div
//                   className={cx("custom-file-list")}
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "repeat(2, 1fr)",
//                     gap: "8px",
//                   }}
//                 >
//                   {fileList.map((fileItem, index) => {
//                     const displayName = fileItem.file
//                       ? fileItem.file.name
//                       : fileItem.tenFileDinhkem || "Unknown file";
//                     const isApiFile = fileItem.isFromApi;

//                     return (
//                       <div
//                         key={`file-${index}`}
//                         style={{
//                           backgroundColor: "#faeceb",
//                           border: "1px solid #f48fb1",
//                           borderRadius: "8px",
//                           padding: "12px 16px",
//                           position: "relative",
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "8px",
//                         }}
//                       >
//                         <span style={{ fontSize: "16px" }}>
//                           <FontAwesomeIcon icon={faFile} />
//                         </span>
//                         {displayName.length > 40 ? (
//                           <Tooltip title={displayName} placement="top">
//                             <span
//                               style={{
//                                 color: "#0063F7",
//                                 fontWeight: 500,
//                                 fontSize: "13px",
//                                 flex: 1,
//                                 overflow: "hidden",
//                                 textOverflow: "ellipsis",
//                                 whiteSpace: "nowrap",
//                                 cursor: "pointer",
//                               }}
//                             >
//                               {`${displayName.substring(0, 40)}...`}
//                             </span>
//                           </Tooltip>
//                         ) : (
//                           <span
//                             style={{
//                               color: "#0063F7",
//                               fontWeight: 500,
//                               fontSize: "13px",
//                               flex: 1,
//                               overflow: "hidden",
//                               textOverflow: "ellipsis",
//                               whiteSpace: "nowrap",
//                             }}
//                           >
//                             {displayName}
//                           </span>
//                         )}
//                         {/* {isApiFile && (
//                           <span
//                             style={{
//                               fontSize: "10px",
//                               color: "#666",
//                               backgroundColor: "#f0f0f0",
//                               padding: "2px 6px",
//                               borderRadius: "4px",
//                             }}
//                           >
//                             API
//                           </span>
//                         )} */}
//                         <div style={{ display: "flex", gap: "4px" }}>
//                           {mode === "view" && (
//                             <FontAwesomeIcon
//                               icon={faEye}
//                               style={{
//                                 color: "#006391",
//                                 cursor: "pointer",
//                                 fontSize: "14px",
//                               }}
//                               onClick={() => {
//                                 if (fileItem.file) {
//                                   // Preview new uploaded file
//                                   setPreviewLocalFile(fileItem.file);
//                                   setPreviewFilename(fileItem.file.name);
//                                   setPreviewFileId("");
//                                 } else {
//                                   // Preview API file
//                                   setPreviewFileId(
//                                     fileItem.id || fileItem.tenFileDinhkem || ""
//                                   );
//                                   setPreviewFilename(
//                                     fileItem.tenFileDinhkem || ""
//                                   );
//                                   setPreviewLocalFile(null);
//                                 }
//                                 setPreviewVisible(true);
//                               }}
//                             />
//                           )}
//                           {!isReadOnly && (
//                             <FontAwesomeIcon
//                               icon={faTrash}
//                               style={{
//                                 color: "#DC3545",
//                                 cursor: "pointer",
//                                 fontSize: "14px",
//                               }}
//                               onClick={() => {
//                                 if (isApiFile && fileItem.id) {
//                                   // Add to deleted files list for API files
//                                   setDeletedFileIds((prev) => [
//                                     ...prev,
//                                     fileItem.id!,
//                                   ]);
//                                   // toast.success("Đã xóa file");
//                                 } else {
//                                   // toast.success("Đã xóa file");
//                                 }
//                                 // Remove from file list
//                                 setFileList((prev) =>
//                                   prev.filter((_, i) => i !== index)
//                                 );
//                               }}
//                             />
//                           )}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </Form.Item>
//             </Col>
//           </Row>
//           <label className="global-label-section">
//             Thông tin việc làm sau hỗ trợ
//           </label>
//           <Row gutter={10}>
//             <Col span={8}>
//               <Form.Item
//                 label="Tình trạng việc làm"
//                 name="tinhtrangViecLamMa"
//                 rules={[
//                   { required: true, message: VALIDATE_MESSAGES.required },
//                 ]}
//               >
//                 <Select
//                   placeholder="Chọn tình trạng việc làm"
//                   disabled={isReadOnly}
//                 >
//                   {dsTinhTrangViecLam.map((item) => (
//                     <Select.Option key={item.value} value={item.value}>
//                       {item.label}
//                     </Select.Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item label="Môi trường làm việc" name="moitruongLamviecMa">
//                 <Select
//                   placeholder="Chọn môi trường làm việc"
//                   disabled={isReadOnly}
//                 >
//                   {dsMoiTruongLamViec.map((item) => (
//                     <Select.Option key={item.value} value={item.value}>
//                       {item.label}
//                     </Select.Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item label="Nghề nghiệp" name="nghenghiepMa">
//                 <Select
//                   placeholder="Chọn nghề nghiệp"
//                   disabled={isReadOnly}
//                   showSearch
//                   optionFilterProp="children"
//                   filterOption={(input, option) =>
//                     (option?.children as unknown as string)
//                       .toLowerCase()
//                       .includes(input.toLowerCase())
//                   }
//                 >
//                   {dsNgheNghiep.map((item) => (
//                     <Select.Option key={item.value} value={item.value}>
//                       {item.label}
//                     </Select.Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item label="Vị trí làm việc" name="vitriLamviec">
//                 <Input
//                   placeholder="Nhập vị trí làm việc"
//                   disabled={isReadOnly}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item label="Thu nhập hàng tháng" name="thunhapHangthang">
//                 <InputNumber
//                   formatter={formatter}
//                   parser={(value) =>
//                     value?.replace(/\./g, "") as unknown as number
//                   }
//                   suffix="VND"
//                   style={{ width: "100%" }}
//                   placeholder="Nhập thu nhập hàng tháng"
//                   disabled={isReadOnly}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item name="ngayBatdauLamviec" label="Ngày bắt đầu việc làm">
//                 <DatePicker
//                   format={{
//                     format: "DD/MM/YYYY",
//                     type: "mask" as const,
//                   }}
//                   style={{ width: "100%" }}
//                   disabled={isReadOnly}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={16}>
//               <Form.Item label="Tên công ty/Doanh nghiệp" name="tenCongty">
//                 <Input
//                   placeholder="Nhập tên công ty/doanh nghiệp"
//                   disabled={isReadOnly}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item name="isDongBhxh" label="Đóng BHXH">
//                 <Radio.Group disabled={isReadOnly}>
//                   <Radio value={1}>Có</Radio>
//                   <Radio value={0}>Không</Radio>
//                 </Radio.Group>
//               </Form.Item>
//             </Col>
//             <Col span={24}>
//               <Form.Item label="Ghi chú" name="vieclamGhiChu">
//                 <Input placeholder="Nhập ghi chú" disabled={isReadOnly} />
//               </Form.Item>
//             </Col>
//           </Row>
//         </Form>
//       </Modal>
//       <FilePreviewModal
//         visible={previewVisible}
//         fileId={previewFileId}
//         filename={previewFilename}
//         localFile={previewLocalFile}
//         isShowThongTinThem={false}
//         onCancel={handlePreviewCancel}
//       />
//       <ModalTraCuu
//         open={modalTraCuuVisible}
//         onCancel={() => setModalTraCuuVisible(false)}
//         onSelect={handleSelect}
//       />
//     </>
//   );
// };

// export default ModalHoTro;
