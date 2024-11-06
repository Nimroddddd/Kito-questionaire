import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { questionnaireAPI } from "../services/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { Loader } from "@/components/ui/loader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ClipLoader } from "react-spinners";

export default function PublicQuestionnaire() {
  const { link } = useParams();
  const [questionnaire, setQuestionnaire] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [score, setScore] = useState(null);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      try {
        const response = await questionnaireAPI.getPublic(link);
        if (response.ok) {
          const data = await response.json();
          setQuestionnaire(data);

          // Check if user has completed this questionnaire
          const completedQuestionnaires = JSON.parse(
            localStorage.getItem("completedQuestionnaires") || "[]"
          );
          if (completedQuestionnaires.includes(link)) {
            setHasCompleted(true);
            setShowCompletionModal(true);
          }
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to fetch questionnaire",
          });
        }
      } catch (error) {
        console.error("Error:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load questionnaire",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionnaire();
  }, [link, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    const formData = new FormData(e.target);
    const answers = [];

    questionnaire.questions.forEach((_, index) => {
      answers.push(formData.get(`q${index}`));
    });

    try {
      const response = await questionnaireAPI.submitPublic(link, answers);
      const data = await response.json();
      if (response.ok) {
        setScore(data.score);
        setShowCompletionModal(true);

        // Save completion status to localStorage
        const completedQuestionnaires = JSON.parse(
          localStorage.getItem("completedQuestionnaires") || "[]"
        );
        completedQuestionnaires.push(link);
        localStorage.setItem(
          "completedQuestionnaires",
          JSON.stringify(completedQuestionnaires)
        );
        setHasCompleted(true);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to submit answers",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while submitting answers",
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  const CompletionModal = () => (
    <Dialog open={showCompletionModal} onOpenChange={setShowCompletionModal}>
      <DialogContent className="max-w-[90%] mx-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Thank You!</DialogTitle>
          <DialogDescription className="space-y-2 text-center">
            <p>Thank you for completing the questionnaire!</p>
            <p className="text-2xl font-bold text-primary">
              Your Score: {score}%
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setShowCompletionModal(false);
              navigate("/");
            }}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  if (loading) {
    return (
      <div className="container py-10 mx-auto">
        <div className="flex items-center justify-center h-[calc(100vh-100px)]">
          <div className="w-32 h-32 border-b-2 border-gray-900 rounded-full animate-spin dark:border-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="container max-w-3xl mx-auto">
        <h1 className="mb-8 text-3xl font-bold tracking-tight">
          {questionnaire.title}
        </h1>

        {hasCompleted ? (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Questionnaire Already Completed</CardTitle>
              <CardDescription>
                You have already submitted your answers for this questionnaire.
                Please login to continue more.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate("/login")} className="w-full">
                Login to Retry
              </Button>
            </CardContent>
          </Card>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {questionnaire.questions.map((question, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{question.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup name={`q${index}`} required className="space-y-3">
                    {question.answers.map((answer, answerIndex) => (
                      <div
                        key={answerIndex}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem
                          value={answerIndex.toString()}
                          id={`q${index}a${answerIndex}`}
                        />
                        <Label htmlFor={`q${index}a${answerIndex}`}>
                          {answer}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            ))}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={submitLoading}
            >
              {submitLoading ? (
                <ClipLoader className="text-black dark:text-white" size={12} />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        )}
      </div>
      <CompletionModal />
    </div>
  );
}
