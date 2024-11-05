import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { ArrowRight, ClipboardList, Users, Award } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <ClipboardList className="h-8 w-8" />,
      title: "Create Questionnaires",
      description:
        "Design custom questionnaires with multiple choice questions",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Share & Collaborate",
      description: "Share your questionnaires with others using unique links",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Track Progress",
      description: "Monitor responses and view detailed analytics",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        <Card className="border-none shadow-lg">
          <CardHeader className="text-center space-y-4 pb-4">
            <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              Welcome to Questionnaire System
            </h1>
            <CardDescription className="text-lg text-gray-600">
              Create, share, and analyze questionnaires with ease
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="border border-gray-200 hover:border-gray-300 transition-all"
                >
                  <CardContent className="pt-6 text-center space-y-4">
                    <div className="rounded-full bg-gray-100 p-3 w-fit mx-auto">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-sm text-gray-500">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center">
              <Link to="/login">
                <Button size="lg" className="group">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
