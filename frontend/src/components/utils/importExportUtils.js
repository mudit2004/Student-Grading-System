import * as XLSX from 'xlsx';

// Export data to Excel
export const exportToExcel = (studentData) => {
    const maxSubjects = 4;
    const excelData = studentData.map(student => {
        const subjects = student.subjects.slice(0, maxSubjects).map(subject => ({
            name: subject.name || '',
            marks: subject.marks || ''
        }));

        while (subjects.length < maxSubjects) {
            subjects.push({ name: "", marks: "" });
        }

        return {
            Name: student.name,
            RollNumber: student.rollNumber,
            ...subjects.reduce((acc, subject, index) => {
                acc[`Subject${index + 1}`] = subject.name;
                acc[`Marks${index + 1}`] = subject.marks;
                return acc;
            }, {}),
            CGPA: student.cgpa
        };
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
    XLSX.writeFile(workbook, `students_${new Date().toISOString().replace(/[:.-]/g, "_")}.xlsx`);
};

// Handle Excel file import
export const handleImport = (file) => {
    if (!file) {
        alert('Please select a file to import');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
        console.log(worksheet); // You can now send data to the backend
    };
    reader.readAsArrayBuffer(file);
};
