import axios from "axios";

const URL_TOKEN = "https://oauth2.googleapis.com/token";

const generateToken = async () => {
  const response = await axios.post(
    URL_TOKEN,
    {},
    {
      params: {
        grant_type: "refresh_token",
        client_secret: "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",
        refresh_token:
          "1//04OyH3NGr0IPhCgYIARAAGAQSNgF-L9IrzZwmmzX93lzDcq2DNwaD5aexs-7osXxEz0z287S0V2TR9PoC3tCmZlSGpFc15Z6RTQ",
        client_id:
          "641539991810-p5bl8sufqc9b6jekipgn4es56v1oqfi7.apps.googleusercontent.com",
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data.access_token;
};

export default generateToken();
