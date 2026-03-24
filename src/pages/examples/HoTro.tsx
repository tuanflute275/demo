// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { API_ENDPOINTS, apiGet, apiPost } from "@/api";
// import AppTable from "@/components/common/AppTable";
// import MultiTypeDatePicker from "@/components/common/MultiTypeDatePicker/MultiTypeDatePicker";
// import type { DanhMucDungChung } from "@/interfaces/common.interface";

// import { useLoading } from "@/shared/hook/useLoading";
// import { usePermissions } from "@/shared/hook/usePermissions";
// import { LOAI_NGAY_SINH } from "@/shared/utils/constants";
// import {
//   convertDayToApiFormat,
//   downloadBase64File,
//   generateSTT,
// } from "@/shared/utils/helper";
// import { faHouse } from "@fortawesome/free-regular-svg-icons";
// import {
//   faArrowsRotate,
//   faDownload,
//   faEdit,
//   faEye,
//   faPlus,
//   faSearch,
//   faTrash,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   Breadcrumb,
//   Button,
//   Card,
//   Col,
//   Form,
//   Input,
//   Row,
//   Select,
//   Space,
//   Typography,
// } from "antd";
// import type { ColumnsType } from "antd/es/table";
// import classNames from "classnames/bind";
// import React, { useCallback, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import styles from "./HoTro.module.scss";
// import ModalHoTro from "./modal-ho-tro-viec-lam/ModalHoTro";
// import ModalImport from "./modal-import/ModalImport";
// import ModalXacNhanXoa from "../modal-xac-nhan-xoa/ModalXacNhanXoa";
// import type {
//   DisabilityRecordFormData,
//   HoSoApiResponse,
// } from "@/interfaces/ho-so.interface";

// const { Title } = Typography;
// const cx = classNames.bind(styles);

// const HoTro: React.FC = () => {
//   const { showLoading, hideLoading } = useLoading();
//   const { hasPermission } = usePermissions();
//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [loading, setLoading] = useState(false);

//   // Search form state
//   const [searchForm] = Form.useForm();
//   const [refreshTrigger, setRefreshTrigger] = useState(0);

//   // State để lưu loại ngày sinh (day/month/year)
//   const [ngaySinhFormat, setNgaySinhFormat] = useState<string | number>(
//     LOAI_NGAY_SINH.NGAY_THANG_NAM
//   );

//   // Data state
//   const [data, setData] = useState<HoSoApiResponse[]>([]);
//   const [totalRecords, setTotalRecords] = useState(0);

//   // Modal state management
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalMode, setModalMode] = useState<"create" | "edit" | "view">(
//     "create"
//   );

//   // Import modal state
//   const [importModalVisible, setImportModalVisible] = useState(false);

//   const [selectedRecord, setSelectedRecord] =
//     useState<DisabilityRecordFormData | null>(null);

//   // Delete modal state
//   const [deleteModalVisible, setDeleteModalVisible] = useState(false);
//   const [recordToDelete, setRecordToDelete] =
//     useState<HoSoApiResponse | null>(null);

//   // API dropdown states
//   const [dsLoaiHoTro, setDsLoaiHoTro] = useState<DanhMucDungChung[]>([]);
//   const [dsTinhTrangViecLam, setDsTinhTrangViecLam] = useState<
//     DanhMucDungChung[]
//   >([]);

//   // Lấy dữ liệu từ API
//   const fetchData = useCallback(async () => {
//     const searchParams = searchForm.getFieldsValue();

//     const params = {
//       ...searchParams,
//       Ngaysinh: convertDayToApiFormat(searchParams.Ngaysinh, ngaySinhFormat),
//       page: currentPage,
//       size: pageSize,
//     };

//     try {
//       setLoading(true);
//       const response = await apiGet(
//         API_ENDPOINTS.HO_TRO_VIEC_LAM.TIM_KIEM,
//         params
//       );

//       if (response.succeeded) {
//         const apiData: HoSoApiResponse[] = response.data?.items || [];

//         setData(apiData);
//         setTotalRecords(response.data.meta?.count || 0);
//       } else {
//         console.error("API failed:", response.errors);
//         toast.error(response.errors || "Lỗi khi tải dữ liệu");
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       toast.error("Lỗi khi tải dữ liệu");
//     } finally {
//       setLoading(false);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [currentPage, pageSize, searchForm, refreshTrigger]);

//   // Load dropdown data from API
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

//   // Load dropdown data on component mount
//   const loadDropdownData = useCallback(async () => {
//     try {
//       const [loaiHoTroData, tinhTrangViecLamData] = await Promise.all([
//         layDanhSachLoaiHoTro(),
//         layDanhSachTinhTrangViecLam(),
//       ]);

//       setDsLoaiHoTro(loaiHoTroData);
//       setDsTinhTrangViecLam(tinhTrangViecLamData);
//     } catch (error) {
//       console.error("Lỗi khi tải dữ liệu dropdown:", error);
//     }
//   }, []);

//   useEffect(() => {
//     loadDropdownData();
//   }, [loadDropdownData]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   // Handle pagination change
//   const handlePaginationChange = (page: number, newPageSize: number) => {
//     setCurrentPage(page);
//     setPageSize(newPageSize);
//   };

//   // Handle search
//   const handleSearch = () => {
//     setCurrentPage(1);
//     setRefreshTrigger((prev) => prev + 1);
//   };

//   // Load detail data from API
//   const loadDetailData = async (
//     hotroId: string
//   ): Promise<DisabilityRecordFormData | null> => {
//     try {
//       const params = {
//         hotroId: hotroId,
//       };
//       const response = await apiGet(
//         API_ENDPOINTS.HO_TRO_VIEC_LAM.CHI_TIET,
//         params
//       );
//       if (response.succeeded && response.data) {
//         // Map detail data từ API response
//         return response.data;
//       } else {
//         toast.error(response.errors || "Lỗi khi tải chi tiết hồ sơ");
//         return null;
//       }
//     } catch (error) {
//       console.error("Error loading detail data:", error);
//       toast.error("Lỗi khi tải chi tiết hồ sơ");
//       return null;
//     }
//   };

//   // Modal handlers
//   const handleOpenModal = async (
//     mode: "create" | "edit" | "view",
//     record?: any
//   ) => {
//     setModalMode(mode);

//     if (record && mode !== "create") {
//       // Show modal first with loading state
//       setSelectedRecord(null);
//       setModalVisible(true);

//       // Load detail data từ API cho mode edit và view
//       const detailData = await loadDetailData(record.hotroId);
//       if (detailData) {
//         const _detailData = {
//           ...detailData,
//           // idhosoId: record.id,
//           // maHoso: record.maHoso?.toString() || "",
//           // hovaTen: record.hoTen?.toString() || "",
//           // ngaySinh: record.ngaySinh?.toString() || "",
//           // gioiTinh: record.gioiTinh?.toString() || "",
//           // soDinhdanh: record.soDinhdanh?.toString() || "",
//         };
//         setSelectedRecord(_detailData);
//       } else {
//         // Fallback to basic data nếu load detail thất bại
//         const mappedRecord: DisabilityRecordFormData = {
//           id: record.id,
//           maHoso: record.maHoSo?.toString() || "",
//           hovaTen: record.hoTen?.toString() || "",
//           ngaySinh: record.ngaySinh?.toString() || "",
//           gioiTinh: record.gioiTinh?.toString() || "",
//           soDinhdanh: record.soDinhdanh?.toString() || "",
//         };
//         setSelectedRecord(mappedRecord);
//       }
//     } else {
//       setSelectedRecord(null);
//       setModalVisible(true);
//     }
//   };

//   const handleCloseModal = () => {
//     setModalVisible(false);
//     setSelectedRecord(null);
//     setModalMode("create");
//   };

//   const handleModalSubmit = async (formData: any) => {
//     showLoading();
//     const formDataObj = new FormData();

//     if (formData.hotroId) {
//       formDataObj.append("hotroId", formData.hotroId);
//     }
//     if (formData.hosoId) {
//       formDataObj.append("HosoId", formData.hosoId);
//     }
//     if (formData.loaiHotroMa) {
//       formDataObj.append("loaiHotroMa", formData.loaiHotroMa);
//     }
//     if (formData.noiDungHotro) {
//       formDataObj.append("noiDungHotro", formData.noiDungHotro);
//     }
//     if (formData.donviThuchien) {
//       formDataObj.append("donviThuchien", formData.donviThuchien);
//     }
//     if (formData.nguonHotroMa) {
//       formDataObj.append("nguonHotroMa", formData.nguonHotroMa);
//     }
//     if (formData.mucHotro) {
//       formDataObj.append("mucHotro", formData.mucHotro);
//     }
//     if (formData.ngayBatdau) {
//       formDataObj.append(
//         "ngayBatdau",
//         formData.ngayBatdau.format("DD/MM/YYYY")
//       );
//     }
//     if (formData.ngayKetthuc) {
//       formDataObj.append(
//         "ngayKetthuc",
//         formData.ngayKetthuc.format("DD/MM/YYYY")
//       );
//     }
//     if (formData.ketquaHotro !== null && formData.ketquaHotro !== undefined) {
//       formDataObj.append("ketquaHotro", formData.ketquaHotro);
//     }
//     if (formData.tthtGhiChu) {
//       formDataObj.append("tthtGhiChu", formData.tthtGhiChu);
//     }
//     if (formData.tinhtrangViecLamMa) {
//       formDataObj.append("tinhtrangViecLamMa", formData.tinhtrangViecLamMa);
//     }
//     if (formData.moitruongLamviecMa) {
//       formDataObj.append("moitruongLamviecMa", formData.moitruongLamviecMa);
//     }
//     if (formData.nghenghiepMa) {
//       formDataObj.append("nghenghiepMa", formData.nghenghiepMa);
//     }
//     if (formData.vitriLamviec) {
//       formDataObj.append("vitriLamviec", formData.vitriLamviec);
//     }
//     if (formData.thunhapHangthang) {
//       formDataObj.append("thunhapHangthang", formData.thunhapHangthang);
//     }
//     if (formData.ngayBatdauLamviec) {
//       formDataObj.append(
//         "ngayBatdauLamviec",
//         formData.ngayBatdauLamviec.format("DD/MM/YYYY")
//       );
//     }
//     if (formData.tenCongty) {
//       formDataObj.append("tenCongty", formData.tenCongty);
//     }
//     if (formData.isDongBhxh !== null && formData.isDongBhxh !== undefined) {
//       formDataObj.append("isDongBhxh", formData.isDongBhxh);
//     }
//     if (formData.vieclamGhiChu) {
//       formDataObj.append("vieclamGhiChu", formData.vieclamGhiChu);
//     }
//     // Handle multiple files
//     if (formData.fileDinhkem && formData.fileDinhkem.length > 0) {
//       formData.fileDinhkem.forEach((file: File) => {
//         formDataObj.append(`FileDinhkem`, file);
//       });
//     }
//     if (formData.idsFiletoDelete && formData.idsFiletoDelete.length > 0) {
//       formDataObj.append(
//         "IdsFiletoDelete",
//         JSON.stringify(formData.idsFiletoDelete)
//       );
//     }

//     try {
//       if (modalMode === "create") {
//         const response = await apiPost(
//           API_ENDPOINTS.HO_TRO_VIEC_LAM.TAO_MOI_CAP_NHAT,
//           formDataObj,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//         if (response.succeeded) {
//           toast.success("Thêm mới hồ sơ thành công");
//         } else {
//           toast.error(response.errors || "Thêm mới hồ sơ thất bại");
//           return;
//         }
//       } else if (modalMode === "edit") {
//         const response = await apiPost(
//           API_ENDPOINTS.HO_TRO_VIEC_LAM.TAO_MOI_CAP_NHAT,
//           formDataObj,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//         if (response.succeeded) {
//           toast.success("Cập nhật hồ sơ thành công");
//         } else {
//           toast.error(response.errors || "Cập nhật hồ sơ thất bại");
//           return;
//         }
//       }
//       // Reload dữ liệu danh sách trước
//       setCurrentPage(1);
//       setRefreshTrigger((prev) => prev + 1);
//       // Sau đó mới đóng modal
//       handleCloseModal();
//     } catch (error: any) {
//       toast.error(error.data);
//       console.error("Error submitting form:", error);
//       toast.error("Có lỗi xảy ra khi lưu dữ liệu");
//     } finally {
//       hideLoading();
//     }
//   };

//   // Delete modal handlers
//   const handleOpenDeleteModal = (record: HoSoApiResponse) => {
//     setRecordToDelete(record);
//     setDeleteModalVisible(true);
//   };

//   const handleCloseDeleteModal = () => {
//     setDeleteModalVisible(false);
//     setRecordToDelete(null);
//   };

//   const handleConfirmDelete = async () => {
//     if (!recordToDelete) return;
//     showLoading();
//     try {
//       const response = await apiPost(API_ENDPOINTS.HO_TRO_VIEC_LAM.XOA, {
//         id: recordToDelete.hotroId,
//       });

//       if (response.succeeded) {
//         toast.success("Xóa hồ sơ thành công");
//         // Refresh table data
//         setCurrentPage(1);
//         setRefreshTrigger((prev) => prev + 1);
//         handleCloseDeleteModal();
//       } else {
//         toast.error(response.errors || "Xóa hồ sơ thất bại");
//       }
//     } catch (error: any) {
//       console.error("Error deleting record:", error);
//       toast.error(error.data);
//     } finally {
//       hideLoading();
//     }
//   };

//   // Handle chuyển hồ sơ
//   // const handleChuyenHoSo = async () => {
//   //   if (selectedRowKeys.length === 0) {
//   //     toast.error("Vui lòng chọn ít nhất một hồ sơ để chuyển");
//   //     return;
//   //   }

//   //   showLoading();
//   //   try {
//   //     // Lấy danh sách ID từ selectedRows
//   //     const hoSoIds = selectedRows.map((row) => row.chuyenvungId);

//   //     const response = await apiPost(
//   //       API_ENDPOINTS.HO_TRO_VIEC_LAM.GUI_CHUYEN_VUNG,
//   //       {
//   //         ids: hoSoIds,
//   //       }
//   //     );

//   //     if (response.succeeded) {
//   //       toast.success("Chuyển hồ sơ thành công");
//   //       // Clear selection
//   //       setSelectedRowKeys([]);
//   //       setSelectedRows([]);
//   //       // Refresh table data
//   //       setCurrentPage(1);
//   //       setRefreshTrigger((prev) => prev + 1);
//   //     } else {
//   //       toast.error(response.errors || "Chuyển hồ sơ thất bại");
//   //     }
//   //   } catch (error: any) {
//   //     console.error("Error transferring records:", error);
//   //     toast.error(error.data || "Có lỗi xảy ra khi chuyển hồ sơ");
//   //   } finally {
//   //     hideLoading();
//   //   }
//   // };

//   const handleExport = async (): Promise<void> => {
//     try {
//       showLoading();
//       const searchParams = searchForm.getFieldsValue();

//       const params = {
//         ...searchParams,
//         Ngaysinh: convertDayToApiFormat(searchParams.Ngaysinh, ngaySinhFormat),
//         page: currentPage,
//         size: pageSize,
//       };

//       const response = await apiGet(
//         API_ENDPOINTS.HO_TRO_VIEC_LAM.EXPORT,
//         params
//       );
//       if (response.succeeded && response.data) {
//         const base64String = response.data.fileContents;
//         const filename = response.data.fileName || "DanhSachHoTro.xlsx";
//         const contentType =
//           response.data.contentType ||
//           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
//         downloadBase64File(base64String, filename, contentType);
//         toast.success("Kết xuất file thành công");
//       } else {
//         toast.error("Kết xuất file thất bại");
//       }
//     } catch (error) {
//       console.error("Error exporting data:", error);
//       toast.error("Kết xuất file thất bại");
//     } finally {
//       hideLoading();
//     }
//   };

//   // Function để render kết quả hỗ trợ việc làm
//   const renderKetQuaHoTro = (trangThai: string | number) => {
//     const trangThaiValue =
//       typeof trangThai === "string" ? parseInt(trangThai) : trangThai;

//     let className = "global-status-blue";
//     let label = "Không xác định";

//     // Tìm label từ TRANG_THAI_HO_TRO_VIEC_LAM_OPTIONS
//     // const option = TRANG_THAI_HO_TRO_VIEC_LAM_OPTIONS.find(
//     //   (opt) => opt.value === trangThaiValue
//     // );

//     // if (option) {
//     //   label = option.label;
//     //   // Set className dựa trên giá trị
//     //   if (
//     //     trangThaiValue === TRANG_THAI_HO_TRO_VIEC_LAM_VALUE.KHONG_THANH_CONG
//     //   ) {
//     //     // Không thành công
//     //     className = "global-status-red";
//     //   } else if (
//     //     trangThaiValue === TRANG_THAI_HO_TRO_VIEC_LAM_VALUE.THANH_CONG
//     //   ) {
//     //     // Thành công
//     //     className = "global-status-green";
//     //   } else {
//     //     className = "global-status-blue";
//     //   }
//     // } else if (typeof trangThai === "string") {
//     //   // Fallback cho trường hợp là string
//     //   label = trangThai;
//     //   className = "global-status-blue";
//     // }

//     return <span className={className}>{label}</span>;
//   };

//   const columns: ColumnsType<HoSoApiResponse> = [
//     {
//       title: "STT",
//       dataIndex: "STT",
//       key: "STT",
//       render: (_, _record, index) =>
//         generateSTT(index || 0, currentPage, pageSize),
//     },
//     {
//       title: "Mã hồ sơ",
//       dataIndex: "maHoso",
//       key: "maHoso",
//     },
//     {
//       title: "Họ và tên",
//       dataIndex: "hoTen",
//       key: "hoTen",
//       render: (name: string) => <Space>{name}</Space>,
//     },
//     {
//       title: "Số định danh/CCCD/CMND",
//       dataIndex: "soDinhdanh",
//       key: "soDinhdanh",
//     },
//     {
//       title: "Ngày sinh",
//       dataIndex: "ngaySinh",
//       key: "ngaySinh",
//       render: (name: string) => <Space>{name}</Space>,
//     },
//     {
//       title: "Giới tính",
//       dataIndex: "gioiTinh",
//       key: "gioiTinh",
//     },
//     {
//       title: "Loại hỗ trợ",
//       dataIndex: "loaiHotro",
//       key: "loaiHotro",
//     },
//     {
//       title: "Tình trạng việc làm",
//       dataIndex: "tinhTrangVieclam",
//       key: "tinhTrangVieclam",
//     },
//     {
//       title: "Kết quả hỗ trợ",
//       dataIndex: "ketquaHotro",
//       key: "ketquaHotro",
//       render: (trangThai: string | number) =>
//         renderKetQuaHoTro(trangThai),
//     },
//     {
//       title: "Thao tác",
//       key: "actions",
//       render: (_, record: HoSoApiResponse) => (
//         <Space>
//           {/* Nút xem chi tiết - luôn hiện */}
//           <Button
//             type="text"
//             icon={<FontAwesomeIcon style={{ color: "#006391" }} icon={faEye} />}
//             onClick={() => handleOpenModal("view", record)}
//             title="Xem chi tiết"
//           />

//           {/* Nút sửa - chỉ hiện khi trạng thái "Tạo mới" */}
//           {hasPermission("all") && (
//             <Button
//               type="text"
//               icon={<FontAwesomeIcon icon={faEdit} />}
//               onClick={() => handleOpenModal("edit", record)}
//               title="Cập nhật"
//             />
//           )}
//           {/* Nút xóa - hiện khi trạng thái "Từ chối tiếp nhận" hoặc "Tạo mới" */}
//           {hasPermission("all") && (
//             <Button
//               type="text"
//               danger
//               icon={<FontAwesomeIcon icon={faTrash} />}
//               onClick={() => handleOpenDeleteModal(record)}
//               title="Xóa"
//             />
//           )}
//         </Space>
//       ),
//     },
//   ];

//   const handleImportModal = (isOpen: boolean) => {
//     setImportModalVisible(isOpen);
//   };

//   const handleImportSuccess = () => {
//     handleImportModal(false);
//     // Refresh data after successful import
//     setCurrentPage(1);
//     setRefreshTrigger((prev) => prev + 1);
//   };

//   return (
//     <div className={cx("usersPage")}>
//       <div className={cx("header-danh-sach")}>
//         <div>
//           <Title level={2} className={cx("pageTitle")}>
//             Quản lý hỗ trợ trong lĩnh vực việc làm
//           </Title>
//           <Breadcrumb
//             className={cx("breadcrumb")}
//             items={[
//               {
//                 title: <FontAwesomeIcon icon={faHouse} />,
//               },
//               {
//                 title: "Quản lý thông tin",
//               },
//               {
//                 title: "Quản lý hỗ trợ",
//               },
//               {
//                 title: "Quản lý hỗ trợ trong lĩnh vực việc làm",
//               },
//             ]}
//           />
//         </div>

//         <div className={cx("headerActions")}>
//           <Button
//             className={cx("exportButton")}
//             icon={<FontAwesomeIcon icon={faDownload} />}
//             onClick={handleExport}
//           >
//             Xuất danh sách
//           </Button>
//           {hasPermission("all") && (
//             <Button
//               type="primary"
//               className={cx("green-btn")}
//               icon={<FontAwesomeIcon icon={faPlus} />}
//               onClick={() => handleOpenModal("create")}
//             >
//               Thêm mới
//             </Button>
//           )}
//         </div>
//       </div>

//       <Card title="Điều kiện tra cứu" className={cx("cardTable")}>
//         <Form form={searchForm} onFinish={handleSearch} layout="vertical">
//           <Row gutter={[10, 0]}>
//             <Col span={6}>
//               <Form.Item label="Mã hồ sơ" name="MaHoso">
//                 <Input placeholder="Nhập mã hồ sơ" />
//               </Form.Item>
//             </Col>
//             <Col span={6}>
//               <Form.Item
//                 label="Số định danh/CCCD/CMND"
//                 name="SoDinhdanh"
//               >
//                 <Input placeholder="Nhập số định danh/CCCD/CMND" />
//               </Form.Item>
//             </Col>
//             <Col span={6}>
//               <Form.Item label="Họ và tên" name="HoTen">
//                 <Input placeholder="Nhập họ và tên" />
//               </Form.Item>
//             </Col>
//             <Col span={6}>
//               <Form.Item label="Ngày sinh" name="Ngaysinh">
//                 <MultiTypeDatePicker
//                   style={{ width: "100%" }}
//                   placeholder="Chọn ngày sinh"
//                   defaultFormat="day"
//                   onFormatChange={(format) => {
//                     let loaiNgaysinh;
//                     switch (format) {
//                       case "day":
//                         loaiNgaysinh = LOAI_NGAY_SINH.NGAY_THANG_NAM; // Ngày/tháng/năm
//                         break;
//                       case "month":
//                         loaiNgaysinh = LOAI_NGAY_SINH.THANG_NAM; // Tháng/năm
//                         break;
//                       case "year":
//                         loaiNgaysinh = LOAI_NGAY_SINH.NAM; // Năm
//                         break;
//                       default:
//                         loaiNgaysinh = LOAI_NGAY_SINH.NGAY_THANG_NAM;
//                     }
//                     setNgaySinhFormat(loaiNgaysinh);
//                   }}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={6}>
//               <Form.Item label="Loại hỗ trợ" name="LoaiHotro">
//                 <Select placeholder="Chọn loại hỗ trợ">
//                   {dsLoaiHoTro.map((item) => (
//                     <Select.Option key={item.value} value={item.value}>
//                       {item.label}
//                     </Select.Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col span={6}>
//               <Form.Item
//                 label="Tình trạng việc làm sau hỗ trợ"
//                 name="TinhtrangVieclam"
//               >
//                 <Select placeholder="Chọn tình trạng việc làm">
//                   {dsTinhTrangViecLam.map((item) => (
//                     <Select.Option key={item.value} value={item.value}>
//                       {item.label}
//                     </Select.Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col span={6}>
//               <Form.Item label="Kết quả hỗ trợ" name="KetquaHotro">
//                 <Select placeholder="Chọn kết quả hỗ trợ">
//                   {/* {TRANG_THAI_HO_TRO_VIEC_LAM_OPTIONS.map((item) => (
//                     <Select.Option key={item.value} value={item.value}>
//                       {item.label}
//                     </Select.Option>
//                   ))} */}
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col
//               span={24}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "flex-end",
//                 gap: "8px",
//               }}
//             >
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 icon={<FontAwesomeIcon icon={faSearch} />}
//                 className={cx("searchButton")}
//               >
//                 Tìm kiếm
//               </Button>
//               <Button
//                 type="primary"
//                 icon={<FontAwesomeIcon icon={faArrowsRotate} />}
//                 className={cx("searchButton")}
//                 onClick={() => {
//                   searchForm.resetFields();
//                   setCurrentPage(1);
//                   setRefreshTrigger((prev) => prev + 1);
//                 }}
//               >
//                 Làm mới
//               </Button>
//             </Col>
//           </Row>
//         </Form>
//       </Card>

//       <Card
//         title={
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <span>Kết quả tìm kiếm </span>
//             {/* <Button
//               disabled={!(selectedRowKeys.length > 0)}
//               type="primary"
//               icon={<FontAwesomeIcon icon={faPaperPlane} />}
//               onClick={handleChuyenHoSo}
//             >
//               Chuyển hồ sơ
//             </Button> */}
//           </div>
//         }
//         className={cx("cardTable")}
//       >
//         <AppTable<HoSoApiResponse>
//           columns={columns}
//           dataSource={data}
//           rowKey="hotroId"
//           loading={loading}
//           showPagination={true}
//           currentPage={currentPage}
//           currentPageSize={pageSize}
//           total={totalRecords}
//           onPaginationChange={handlePaginationChange}
//           paginationConfig={{
//             showSizeChanger: true,
//             showQuickJumper: false,
//           }}
//         />
//       </Card>

//       <ModalHoTro
//         open={modalVisible}
//         mode={modalMode}
//         onCancel={handleCloseModal}
//         onSubmit={handleModalSubmit}
//         data={selectedRecord || undefined}
//       />

//       <ModalXacNhanXoa
//         visible={deleteModalVisible}
//         onCancel={handleCloseDeleteModal}
//         onConfirm={handleConfirmDelete}
//       />
//       <ModalImport
//         open={importModalVisible}
//         onCancel={() => handleImportModal(false)}
//         onSubmit={handleImportSuccess}
//       />
//     </div>
//   );
// };

// export default HoTro;
