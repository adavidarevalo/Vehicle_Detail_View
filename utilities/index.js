exports.renderVehicleHtml = function (vehicle) {
  if (!vehicle) return '<p>No vehicle data available.</p>';
  const price = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(vehicle.price || 0);
  const mileage = vehicle.mileage ? new Intl.NumberFormat('en-US').format(vehicle.mileage) : 'N/A';
  return (
    '<div class="vehicle-wrap">' +
      '<h2>' + (vehicle.make || '') + ' ' + (vehicle.model || '') + '</h2>' +
      '<p><strong>Price:</strong> ' + price + '</p>' +
      '<p><strong>Mileage:</strong> ' + mileage + '</p>' +
      '<p>' + (vehicle.description || '') + '</p>' +
    '</div>'
  );
};
