import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { ArrowRight, ClipboardList, Users, Award } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun } from "lucide-react";

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  const features = [
    {
      icon: <ClipboardList className="w-8 h-8" />,
      title: "Create Questionnaires",
      description:
        "Design custom questionnaires with multiple choice questions",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Share & Collaborate",
      description: "Share your questionnaires with others using unique links",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Track Progress",
      description: "Monitor responses and view detailed analytics",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="w-full max-w-4xl space-y-8">
        <Card className="border-none shadow-lg">
          <CardHeader className="pb-4 space-y-4 text-center">
            <div className="flex justify-center">
              <Button
                variant="secondary"
                size="icon"
                onClick={toggleTheme}
                className="text-black dark:text-white"
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </Button>
            </div>
            <h1 className="text-4xl font-bold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-gray-900 dark:from-gray-50 dark:to-gray-200 to-gray-600">
              Welcome to Questionnaire System
            </h1>
            <CardDescription className="text-lg text-gray-600">
              Create, share, and analyze questionnaires with ease
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="transition-all border border-gray-200 hover:border-gray-300"
                >
                  <CardContent className="pt-6 space-y-4 text-center">
                    <div className="p-3 mx-auto bg-gray-100 rounded-full dark:bg-gray-800 w-fit">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
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
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
