import LoginForm from "@/components/auth/login-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { NextPage } from "next";

const Page: NextPage = () => {
  return (
    <div className=" h-screen ">
      <div className=" container flex w-full h-full justify-center items-center">
        <Card className=" max-w-xl w-full">
          <CardHeader>
            <h1 className=" text-2xl text-center font-semibold">
              Se connecter
            </h1>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
