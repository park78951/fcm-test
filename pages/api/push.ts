import { NextApiRequest, NextApiResponse } from "next";
import fcm from "firebase-admin";
import {
  getMessaging,
  MulticastMessage,
  Message,
} from "firebase-admin/messaging";
import { ServiceAccount } from "firebase-admin";
// import serviceAccount from "../../fcm/private-test-duncan.json";

let tokenList: string[] = [];

const serviceAccount = {
  type: "service_account",
  project_id: "dobo-fcm-test",
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: "firebase-adminsdk-gp3lg@dobo-fcm-test.iam.gserviceaccount.com",
  client_id: process.env.CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-gp3lg%40dobo-fcm-test.iam.gserviceaccount.com",
};

fcm.initializeApp({
  credential: fcm.credential.cert(serviceAccount as ServiceAccount),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await register(req, res);
  } else if (req.method === "GET") {
    await notify(req, res);
  } else if (req.method === "DELETE") {
    await remove(req, res);
  }
}

async function register(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { token } = req.body;

    console.log("register", token);

    const [duplicateToken] = tokenList.filter(
      (registedToken) => token === registedToken
    );

    if (duplicateToken) {
      res.status(401).json({ message: "token is already registered" });
      return;
    }

    tokenList.push(token);
    res.status(200).send("success");
  } catch (e: any) {
    console.dir(e);
    res.status(500).json({ message: "register: Internal server error", ...e });
  }
}

async function notify(req: NextApiRequest, res: NextApiResponse) {
  try {
    // const payload = {
    //   title: "Web Notification",
    //   body: "서버에서 내려온 FCM 알림입니다.",
    //   icon: `${process.env.NEXT_PUBLIC_DOMAIN}/vercel.svg`,
    //   tag: "default tag",
    //   ...req.query,
    // };

    console.log(tokenList);

    const message: MulticastMessage = {
      notification: {
        title: "Web Notification",
        body: "서버에서 내려온 FCM 알림입니다.",
        imageUrl: `${process.env.NEXT_PUBLIC_DOMAIN}/vercel.svg`,
      },
      tokens: tokenList,
    };

    const response = await getMessaging().sendMulticast(message);

    console.log("multicast response", response);

    if (response.failureCount > 0) {
      const failedTokens: string[] = [];

      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          failedTokens.push(tokenList[idx]);
        }
      });

      console.log("List of tokens that caused failure: ", failedTokens);
    }

    res.status(201).json(response);
  } catch (e: any) {
    console.dir(e);
    res.status(500).json({
      error: "notify: Internal server error",
      ...e,
      imageUrl: `${process.env.NEXT_PUBLIC_DOMAIN}/vercel.svg`,
    });
  }
}

async function remove(req: NextApiRequest, res: NextApiResponse) {
  try {
    const tokenLength = tokenList.length;

    if (tokenLength === 0) {
      return;
    }

    const newTokenList = tokenList.filter((token) => token !== req.body.token);

    if (newTokenList.length === tokenLength) {
      throw Error("token not found");
    }

    tokenList = newTokenList;
  } catch (e: any) {
    console.dir(e);

    if (e.message === "token not found") {
      res.status(400).json(e);
    }

    res.status(500).json(e);
  }
}
