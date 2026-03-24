// import { API_ENDPOINTS, apiGet } from "@/api";
// import MultiTypeDatePicker from "@/components/common/MultiTypeDatePicker";
// import type { DanhMucDungChung } from "@/interfaces/common.interface";
// // import type { TraCuuHoTroCSXHApiResponse } from "@/interfaces/ho-tro-csxh.interface";
// import { formatNumber } from "@/shared/hook/useNumberFormat";
// import { LOAI_NGAY_SINH } from "@/shared/utils/constants";
// import { convertDayToApiFormat } from "@/shared/utils/helper";
// import {
//   faCheck,
//   faCircleXmark,
//   faRotateRight,
//   faSearch
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   Button,
//   Col,
//   Form,
//   Input,
//   message,
//   Modal,
//   Pagination,
//   Radio,
//   Row,
//   Select,
//   Space,
//   Spin,
//   Tooltip,
// } from "antd";
// import classNames from "classnames/bind";
// import React, { useCallback, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import styles from "./ModalTraCuu.module.scss";

// export interface SearchResultItem {
//   id: string;
//   maHoSo?: string;
//   hoTen?: string;
//   soDinhDanh?: string;
//   gioiTinh?: string;
//   ngaySinh?: string;
//   mucDoKhuyetTatMa?: string;
//   mucDoKhuyetTatTen?: string;
//   dangKhuyetTatMa?: string;
//   dangKhuyetTatTen?: string;
// }

// export interface ModalTraCuuProps {
//   open: boolean;
//   onCancel: () => void;
//   onSelect: (data: SearchResultItem) => void;
// }

// const cx = classNames.bind(styles);

// const ModalTraCuu: React.FC<ModalTraCuuProps> = ({
//   open,
//   onCancel,
//   onSelect,
// }) => {
//   const [searchForm] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [selectedRecord, setSelectedRecord] = useState<string | null>(null);
//   // const [searchResults, setSearchResults] = useState<
//   //   TraCuuHoTroCSXHApiResponse[]
//   // >([]);
//   const [dsGioiTinh, setDsGioiTinh] = useState<DanhMucDungChung[]>([]);
//   // State để lưu loại ngày sinh (day/month/year)
//   const [ngaySinhFormat, setNgaySinhFormat] = useState<string | number>(
//     LOAI_NGAY_SINH.NGAY_THANG_NAM
//   );
//   const [totalRecords, setTotalRecords] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);

//   const handlePaginationChange = (page: number, newPageSize: number) => {
//     setCurrentPage(page);
//     setPageSize(newPageSize);
//     fetchData(page, newPageSize);
//   };

//   const fetchData = async (page = currentPage, size = pageSize) => {
//     const searchParams = searchForm.getFieldsValue();

//     const params = {
//       ...searchParams,
//       GioiTinh: searchParams.GioiTinh,
//       page,
//       size,
//       NgaySinh: convertDayToApiFormat(searchParams.NgaySinh, ngaySinhFormat),
//     };

//     // try {
//     //   setLoading(true);
//     //   const response = await apiGet(
//     //     API_ENDPOINTS.HO_TRO_VIEC_LAM.TRA_CUU,
//     //     params
//     //   );

//     //   if (response.succeeded) {
//     //     const apiData: TraCuuHoTroCSXHApiResponse[] =
//     //       response.data?.items || [];
//     //     setTotalRecords(response.data?.meta.count || 0);
//     //     setSearchResults(apiData);
//     //     // setTotalRecords(response.data?.totalCount || 0);
//     //   } else {
//     //     console.error("API failed:", response.message);
//     //     message.error(response.message || "Lỗi khi tải dữ liệu");
//     //   }
//     // } catch (error) {
//     //   console.error("Error fetching data:", error);
//     //   message.error("Lỗi khi tải dữ liệu");
//     // } finally {
//     //   setLoading(false);
//     // }
//   };

//   const handleSearch = async () => {
//     fetchData();
//   };

//   const handleReset = useCallback(() => {
//     searchForm.resetFields();
//     // setSearchResults([]);
//     setSelectedRecord(null);
//     setCurrentPage(1);
//     setPageSize(10);
//     setNgaySinhFormat(LOAI_NGAY_SINH.NGAY_THANG_NAM);
//   }, [searchForm]);

//   const handleSelect = () => {
//     // if (selectedRecord) {
//     //   const selected = searchResults.find((item) => item.id === selectedRecord);
//     //   if (selected) {
//     //     onSelect(selected);
//     //     onCancel();
//     //   }
//     // }
//   };

//   const handleCancel = () => {
//     searchForm.resetFields();
//     // setSearchResults([]);
//     setSelectedRecord(null);
//     setCurrentPage(1);
//     setPageSize(10);
//     onCancel();
//   };

//   useEffect(() => {
//     if (!open) {
//       handleReset();
//     }
//   }, [open, handleReset]);

//   const loadDanhSachGioiTinh = async () => {
//     // try {
//     //   const res = await apiGet(API_ENDPOINTS.GIOI_TINH.LIST);
//     //   if (res.succeeded) {
//     //     setDsGioiTinh(res.data || []);
//     //   } else {
//     //     toast.error(res.errors);
//     //   }
//     // } catch (error) {
//     //   console.error("Lỗi lấy danh sách giới tính:", error);
//     // }
//   };

//   const renderFooter = () => {
//     return (
//       <Space>
//         <Button
//           icon={<FontAwesomeIcon icon={faCheck} />}
//           onClick={handleSelect}
//           type="primary"
//           disabled={!selectedRecord}
//         >
//           Chọn
//         </Button>
//         <Button
//           icon={<FontAwesomeIcon icon={faCircleXmark} />}
//           onClick={handleCancel}
//         >
//           Hủy
//         </Button>
//       </Space>
//     );
//   };

//   useEffect(() => {
//     loadDanhSachGioiTinh();
//   }, []);

//   return (
//     <Modal
//       className={cx("modal-tra-cuu-thong-tin")}
//       title="Tra cứu thông tin"
//       open={open}
//       onCancel={handleCancel}
//       footer={renderFooter()}
//       width={1030}
//       style={{ top: 20 }}
//     >
//       <div className={cx("search-section")}>
//         <label className={cx("global-label-section")}>
//           <span>Điều kiện tra cứu</span>
//         </label>

//         <Form form={searchForm} layout="vertical">
//           <Row gutter={10}>
//             <Col span={8}>
//               <Form.Item label="Mã hồ sơ" name="MaHoSo">
//                 <Input placeholder="Nhập mã hồ sơ" />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item
//                 label="Số định danh/ CCCD/ CMND của"
//                 name="SoDinhDanh"
//               >
//                 <Input placeholder="Nhập số định danh/ CCCD/ CMND" />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item label="Họ và tên" name="HoTen">
//                 <Input placeholder="Nhập họ và tên" />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={10}>
//             <Col span={8}>
//               <Form.Item label="Giới tính" name="GioiTinh">
//                 <Select placeholder="Chọn giới tính">
//                   {dsGioiTinh.map((item) => (
//                     <Select.Option key={item.value} value={item.value}>
//                       {item.label}
//                     </Select.Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item label="Ngày tháng năm sinh" name="NgaySinh">
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
//           </Row>

//           <div className={cx("note-text")}>
//             Lưu ý: Tra cứu theo mã hồ sơ  hoặc Số định danh/ CCCD/ CMND 
//              hoặc theo bộ thông tin Họ và tên, ngày tháng năm sinh, giới tính
//           </div>

//           <div className={cx("action-buttons")}>
//             <Button
//               type="primary"
//               className={cx("blue-btn")}
//               icon={<FontAwesomeIcon icon={faSearch} />}
//               onClick={handleSearch}
//             >
//               Tìm kiếm
//             </Button>
//             <Button
//               type="primary"
//               className={cx("blue-btn")}
//               icon={<FontAwesomeIcon icon={faRotateRight} />}
//               onClick={() => {
//                 handleReset();
//                 fetchData();
//               }}
//             >
//               Làm mới
//             </Button>
//           </div>
//         </Form>
//       </div>

//       <div className={cx("result-section")}>
//         <label className={cx("global-label-section")}>
//           <span>Kết quả tìm kiếm</span>
//         </label>

//         {/* <Spin spinning={loading} tip="Đang tải dữ liệu...">
//           {searchResults.length > 0 ? (
//             <Radio.Group
//               className={cx("result-list")}
//               value={selectedRecord}
//               onChange={(e) => setSelectedRecord(e.target.value)}
//             >
//               {searchResults.map((item) => (
//                 <div key={item.id} className={cx("result-item")}>
//                   <Radio value={item.id}>
//                     <div className={cx("result-content")}>
//                       <div className={cx("result-header")}>
//                         <div
//                           className={cx("result-header-item")}
//                           style={{ width: 160 }}
//                         >
//                           <span className={cx("field-label")}>
//                             <Tooltip
//                               title={
//                                 item.hoten && item.hoten.length > 20
//                                   ? item.hoten
//                                   : undefined
//                               }
//                             >
//                               <span
//                                 className={cx("field-value")}
//                                 style={{
//                                   maxWidth: 160,
//                                   display: "inline-block",
//                                   whiteSpace: "nowrap",
//                                   overflow: "hidden",
//                                   textOverflow: "ellipsis",
//                                   verticalAlign: "middle",
//                                 }}
//                               >
//                                 {item.hoten}
//                               </span>
//                             </Tooltip>
//                           </span>
//                           <span className={cx("field-value")}>
//                             {item.gioiTinh} - {item.ngaySinh}
//                           </span>
//                         </div>
//                         <div
//                           className={cx("result-header-item")}
//                           style={{ width: 200 }}
//                         >
//                           <span className={cx("field-label")}>
//                             Số định danh/ CCCD/ CMND
//                           </span>
//                           <span className={cx("field-value")}>
//                             {item.soDinhDanh}
//                           </span>
//                         </div>
//                         <div
//                           className={cx("result-header-item")}
//                           style={{ width: 120 }}
//                         >
//                           <span className={cx("field-label")}>
//                             Mã hồ sơ
//                           </span>
//                           <span className={cx("field-value")}>
//                             {item.maHoSo}
//                           </span>
//                         </div>
//                         <div
//                           className={cx("result-header-item")}
//                           style={{ width: 250, alignItems: "center" }}
//                         >
//                           <span className={cx("field-label")}>
//                             1
//                           </span>
//                           <span
//                             className={cx(
//                               item.mucDoKhuyetTatTen
//                                 ?.toLowerCase()
//                                 .includes("nhẹ")
//                                 ? "global-status-underline-green"
//                                 : item.mucDoKhuyetTatTen
//                                     ?.toLowerCase()
//                                     .includes("vừa")
//                                 ? "global-status-underline-yellow"
//                                 : item.mucDoKhuyetTatTen
//                                     ?.toLowerCase()
//                                     .includes("nặng")
//                                 ? "global-status-underline-red"
//                                 : null
//                             )}
//                             style={
//                               item.mucDoKhuyetTatTen
//                                 ?.toLowerCase()
//                                 .includes("nặng")
//                                 ? { maxWidth: "160px" }
//                                 : { maxWidth: "120px" }
//                             }
//                           >
//                             {item.mucDoKhuyetTatTen}
//                           </span>
//                         </div>
//                         <div className={cx("result-header-item")}>
//                           <span className={cx("field-label")}>
//                             2
//                           </span>
//                           <span className={cx("field-value")}>
//                             <Tooltip
//                               title={
//                                 item?.dangKhuyetTatTen &&
//                                 item.dangKhuyetTatTen.length > 20
//                                   ? item.dangKhuyetTatTen
//                                   : undefined
//                               }
//                             >
//                               <span
//                                 className={cx("field-value")}
//                                 style={{
//                                   maxWidth: 200,
//                                   minWidth: 200,
//                                   display: "inline-block",
//                                   whiteSpace: "nowrap",
//                                   overflow: "hidden",
//                                   textOverflow: "ellipsis",
//                                   verticalAlign: "middle",
//                                 }}
//                               >
//                                 {item.dangKhuyetTatTen}
//                               </span>
//                             </Tooltip>
//                           </span>
//                         </div>
//                       </div>
//                       <div className={cx("result-row")}></div>
//                     </div>
//                   </Radio>
//                 </div>
//               ))}
//             </Radio.Group>
//           ) : (
//             <div className={cx("no-results")}>
//               {!loading && searchResults.length === 0 && (
//                 <span>Không có kết quả tìm kiếm</span>
//               )}
//             </div>
//           )}
//         </Spin>
//         {searchResults.length > 0 && (
//           <Pagination
//             style={{
//               marginTop: 8,
//               display: "flex",
//               justifyContent: "flex-end",
//             }}
//             current={currentPage}
//             pageSize={pageSize}
//             onChange={(page, pageSize) => {
//               handlePaginationChange(page, pageSize);
//             }}
//             total={totalRecords}
//             showSizeChanger={true}
//             pageSizeOptions={["10", "20", "50", "100"]}
//             showQuickJumper={false}
//             showTotal={(total, range) =>
//               `Hiển thị ${formatNumber(range[0], {
//                 decimals: 0,
//               })}-${formatNumber(range[1], {
//                 decimals: 0,
//               })} trong tổng số ${formatNumber(total, { decimals: 0 })} bản ghi`
//             }
//             itemRender={(current, type, originalElement) => {
//               if (type === "page") {
//                 return <span>{formatNumber(current, { decimals: 0 })}</span>;
//               }
//               return originalElement;
//             }}
//           />
//         )} */}
//       </div>
//     </Modal>
//   );
// };

// export default ModalTraCuu;
