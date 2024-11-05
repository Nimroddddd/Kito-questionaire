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
    navigator.clipboard.writeText(`http://localhost:5173/q/${link}`);
    toast({
      title: "Link copied",
      description: "Questionnaire link has been copied to clipboard",
    });
  };

  return (
    <div className="antialiased bg-gray-100 min-h-screen">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 mb-7">
          <h2 className="text-2xl sm:text-2xl font-bold ">
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
          <div className="container mx-auto py-10">
            <div className="flex items-center justify-center h-[calc(100vh-100px)]">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-5">
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
                    className="text-black items-center flex gap-1 hover:underline"
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
