import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportExcel = (report) => {
  const data = [
    {
      "Total Members": report.total_members,
      "Membership Plans": report.total_plans,
      "Total Revenue": report.total_revenue,
      "Today's Attendance": report.today_attendance,
    },
  ];

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Gym Report"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(file, "Gym_Report.xlsx");
};