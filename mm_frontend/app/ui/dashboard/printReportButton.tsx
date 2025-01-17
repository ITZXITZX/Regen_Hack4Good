// ui
import { Button, Col, Dropdown } from 'react-bootstrap';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import CalendarIcon from '@heroicons/react/24/outline';
// functions & state
import { downloadCSV, downloadCsv, changeDateFormat } from '@/app/functions';
import { usePrintRangeStore } from '@/app/store';
// jsx components
import DatePicker from 'react-datepicker';
// misc
import { addDays } from 'date-fns';

export default function PrintReportButton({ id }: { id: string }) {
  const { printRange, setPrintRange } = usePrintRangeStore();
  const maxDate = printRange[0] ? addDays(printRange[0], 30) : null;

  const onChange = (dates: any) => {
    setPrintRange([dates[0], dates[1]]);
  };

  const handleDownload = () => {
    if (printRange[0] && printRange[1]) {
      downloadCsv(
        id,
        new Date(printRange[0]).toISOString(),
        new Date(printRange[1]).toISOString(),
      ).then((result) => {
        if (result == null) {
          alert('No data found for the selected range');
        } else if (result == false) {
          alert('Download failed');
        }
      });
    }
  };

  return (
    <Dropdown>
      <Dropdown.Toggle className="custom-print-button mr-3">
        <Col xs={12} className="font-semibold">
          <DocumentTextIcon className="sort-icon" />
          Print Report
        </Col>
      </Dropdown.Toggle>
      <Dropdown.Menu className="custom-dropdown-calendar">
        <DatePicker
          selected={printRange[0]}
          onChange={onChange}
          startDate={printRange[0]}
          endDate={printRange[1]}
          maxDate={maxDate}
          selectsRange
          inline
        />
        <Button className="border-0 bg-transparent" onClick={handleDownload}>
          <Col className="font-semibold text-blue-500">Confirm</Col>
        </Button>
      </Dropdown.Menu>
    </Dropdown>
  );
}
