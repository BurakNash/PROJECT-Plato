export default {
  remoteURL:
    process.env.NODE_ENV === "production"?"/api":"http://localhost:5002/api"
};
