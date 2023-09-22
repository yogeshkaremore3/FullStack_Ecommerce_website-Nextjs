import { NextResponse } from "next/server";
import Forgot from "@/models/Forgot";
import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
import CryptoJS from "crypto-js";
const Mailjet = require("node-mailjet");

export async function POST(req: Request) {
  let rand = function () {
    return Math.random().toString(36).substr(2);
  };

  let token = function () {
    return rand() + rand() + rand() + "-" + rand() + rand() + rand();
  };
  let new_token = token();

  const res = await req.json();

  if (res.sendMail) {
    let message = null;
    let success = null;
    let user = await User.findOne({ email: res.email });
    if (user) {
      let dbforgot = await Forgot.findOne({ email: res.email });
      if (dbforgot) {
        await Forgot.findOneAndUpdate(
          { email: res.email },
          { token: new_token }
        );
      } else {
        let forgot = new Forgot({
          email: res.email,
          token: new_token,
        });
        await forgot.save();
      }

      const mailjet = Mailjet.apiConnect(
        process.env.MJ_APIKEY_PUBLIC,
        process.env.MJ_APIKEY_PRIVATE
      );

      const request = mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: "yogeshkaremore3@gmail.com",
              Name: "Opencart.com",
            },
            To: [
              {
                Email: `${res.email}`,
                Name: `${user.name}`,
              },
            ],
            Subject: "There was a request to change your password!",
            HTMLPart: `We have sent you this email in response to your request to reset your password on Opencart.com

              To reset your password, please follow the link below:
          
              <a href="http://localhost:3000/forgot?token=${new_token}">Clik here to reset your password</a>
          
              <br/><br/>
          
              We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your My Account Page and change your password.
          
              <br/><br/>`,
          },
        ],
      });

      await request.then((result) => {
          success = true;
          message ="Password reset instruction have been sent to your email successfully";
        }).catch((err) => {
          success = false;
          message = "some error occured";
        });

      return NextResponse.json({ success: success, message: message });
    } else {
      return NextResponse.json({success: false,message: "this email is not registered"});
    }
  } else {
    const forgotPass = await Forgot.findOne({ token: res.token });
    if (forgotPass) {
      await User.findOneAndUpdate({ email: forgotPass.email },{password: CryptoJS.AES.encrypt(res.password,process.env.AES_SECRET).toString()});
      await Forgot.findOneAndDelete({ email: forgotPass.email });
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false });
    }
  }
}

export default connectDb();
