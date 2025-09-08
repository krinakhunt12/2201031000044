import React from 'react';

const AddressCard = ({ a = {}, index = 0 }) => {
  return (
    <div className="border rounded p-4">
      <div className="font-medium">{a.label || a.name || `Address ${index + 1}`}</div>
      <div className="text-sm text-gray-700">{a.address || a.line1 || ''}</div>
      <div className="text-sm text-gray-500">{a.city || ''} {a.state || ''} {a.postalCode || ''}</div>
      {(a.email || a.phone) && (
        <div className="text-sm text-gray-500 mt-1">{a.email} {a.phone && `| ${a.phone}`}</div>
      )}
    </div>
  );
};

export default AddressCard;
