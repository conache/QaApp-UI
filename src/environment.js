function isDevEnvironment() {
  return process.env.NODE_ENV === "development";
}

export const ENV = {
  base_url: isDevEnvironment() ? "http://localhost:3000" : "http://qa-application.s3-website.eu-central-1.amazonaws.com",
  client_env: 'development',
};

export const __BASE_API_URL__ = isDevEnvironment() ? "http://localhost:8085" : "http://18.195.101.10:8080";
export const _BASE_SOCKET_SERVER_URL_ = isDevEnvironment() ? "http://3.134.101.74:8080" : "http://3.134.101.74:8080";