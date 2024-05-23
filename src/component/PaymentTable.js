import React, { useState } from 'react';
import { Table, Button, Form} from 'react-bootstrap';

const initialPayment = [
    { id: 1, payment: 1001, company: 'Tech Jungle', dueDate: '14 Sep 2022', status: 'Unpaid', amount: 973.48 },
    { id: 2, payment: 1001, company: 'Tech Jungle', dueDate: '14 Sep 2022', status: 'Paid', amount: 480.21 },
    { id: 3, payment: 1001, company: 'Tech Jungle', dueDate: '14 Sep 2022', status: 'Unpaid', amount: 1254.37 },
    { id: 4, payment: 1001, company: 'Tech Jungle', dueDate: '14 Sep 2022', status: 'Paid', amount: 973.48 },
    { id: 5, payment: 1001, company: 'Tech Jungle', dueDate: '14 Sep 2022', status: 'Unpaid', amount: 7094.45 },
    { id: 6, payment: 1001, company: 'Tech Jungle', dueDate: '14 Sep 2022', status: 'Paid', amount: 4599.75 },
    { id: 7, payment: 1001, company: 'Tech Jungle', dueDate: '14 Sep 2022', status: 'Paid', amount: 804.56 },
  ];

const PaymentTable = () => {

    const [payment, setPayment] = useState(initialPayment);
    const [selectedPayment, setSelectedPayment] = useState([]);

    const handleSelectAll = (event) => {
        if (event.target.checked) {
          const newSelecteds = payment.map((n) => n.id);
          setSelectedPayment(newSelecteds);
          return;
        }
        setSelectedPayment([]);
    };

    const handleSelectOne = (event, id) => {
        const selectedIndex = selectedPayment.indexOf(id);
        let newSelected = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selectedPayment, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selectedPayment.slice(1));
        } else if (selectedIndex === selectedPayment.length - 1) {
          newSelected = newSelected.concat(selectedPayment.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selectedPayment.slice(0, selectedIndex),
            selectedPayment.slice(selectedIndex + 1),
          );
        }
    
        setSelectedPayment(newSelected);
      };

      const isSelected = (id) => selectedPayment.indexOf(id) !== -1;

  return (
    <div className='container mt-4'>
        <div className='mb-2 d-flex justify-content-between align-items-center'>
            <div>
            <Button variant="primary" className="me-2">Mark as paid</Button>
            <Button variant="secondary" className="me-2">Mark as unpaid</Button>
            <Button variant="info" className="me-2">Print</Button>
            <Button variant="danger">Delete</Button>
            </div>
            <Form.Control type="text" placeholder="Search payment" className="w-auto" />
        </div>
        <Table bordered hover responsive>
            <thead className="table-light">
            <tr>
                <th>
                <Form.Check 
                    type="checkbox" 
                    checked={payment.length > 0 && selectedPayment.length === payment.length}
                    onChange={handleSelectAll}
                    indeterminate={selectedPayment.length > 0 && selectedPayment.length < payment.length}
                />
                </th>
                <th>Invoice</th>
                <th>Company</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {payment.map((payment) => {
                const isItemSelected = isSelected(payment.id);
                return (
                <tr key={payment.id} className={isItemSelected ? 'table-active' : ''}>
                    <td>
                    <Form.Check 
                        type="checkbox" 
                        checked={isItemSelected}
                        onChange={(event) => handleSelectOne(event, payment.id)}
                    />
                    </td>
                    <td>{payment.payment}</td>
                    <td>{payment.company}</td>
                    <td>{payment.dueDate}</td>
                    <td>
                    <span className={`badge ${payment.status === 'Paid' ? 'bg-success' : 'bg-danger'}`}>
                        {payment.status}
                    </span>
                    </td>
                    <td>${payment.amount.toFixed(2)}</td>
                    <td>
                    <Button variant="link" className="p-0 me-2">View</Button>
                    <Button variant="link" className="p-0 me-2">Edit</Button>
                    <Button variant="link" className="p-0 text-danger">Delete</Button>
                    </td>
                </tr>
                );
            })}
            </tbody>
        </Table>
    </div>
  );
};

export default PaymentTable;
