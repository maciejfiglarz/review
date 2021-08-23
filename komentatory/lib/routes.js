const getHostname = () => {
  return `http://${window.location.hostname}:${window.location.port}`;
}
export const  getRouteToTemponaryFile = () => {
  return getHostname() + '/upload/temponary-image/';
};
