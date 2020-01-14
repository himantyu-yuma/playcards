function connect() {
    navigator.bluetooth.requestDevice({ acceptAllDevices: true })
    .then(device => device.gatt.connect())
    .catch(error => console.log(error));
}