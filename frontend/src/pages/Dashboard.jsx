import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { questionnaireAPI } from "../services/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "@/components/ui/loader";
import { ArrowUpRight, Eye } from "lucide-react";

export default function Dashboard() {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchQuestionnaires = async () => {
      try {
        const response = await questionnaireAPI.getList();
        if (response.ok) {
          const data = await response.json();
          setQuestionnaires(data);
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch questionnaires",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error:", error);
        toast({
          title: "Error",
          description: "An error occurred while fetching questionnaires",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionnaires();
  }, [navigate, toast]);

  const handleCopy = (link) => {
    navigator.clipboard.writeText(`${window.location.origin}/q/${link}`);
    toast({
      title: "Link copied",
      description: "Questionnaire link has been copied to clipboard",
    });
  };

  return (
    <div className="antialiased bg-gray-100 dark:bg-[#050505] dark:text-white text-black min-h-screen">
      <main className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between px-5 sm:flex-row sm:items-center mb-7">
          <h2 className="text-2xl font-bold sm:text-2xl ">
            Your Questionnaires
          </h2>
          <Link
            className="flex text[4px] mt-5 sm:mt-0"
            to="/create-questionnaire"
          >
            <Button>Create Questionnaire</Button>
          </Link>
        </div>
        {loading ? (
          <div className="container py-10 mx-auto">
            <div className="flex items-center justify-center h-[calc(100vh-100px)]">
              <div className="w-32 h-32 border-b-2 border-gray-900 rounded-full animate-spin dark:border-white" />
            </div>
          </div>
        ) : (
          <div className="grid w-full grid-cols-1 gap-4 px-5 md:grid-cols-2 lg:grid-cols-3">
            {questionnaires.map((questionnaire) => (
              <Card key={questionnaire._id}>
                <CardHeader>
                  <h3 className="text-lg font-semibold">
                    {questionnaire.title}
                  </h3>
                  <p className="text-sm text-gray-600 h-[40px]">
                    Created by: {questionnaire.creator.firstName}{" "}
                    {questionnaire.creator.lastName} (
                    {questionnaire.creator.position})
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Created on:{" "}
                    {new Date(questionnaire.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Link
                    to={`/questionnaire/${questionnaire._id}`}
                    className="flex items-center gap-1 text-black dark:text-white hover:underline"
                  >
                    View Questionnaire
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => handleCopy(questionnaire.shareableLink)}
                  >
                    Copy Link
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
