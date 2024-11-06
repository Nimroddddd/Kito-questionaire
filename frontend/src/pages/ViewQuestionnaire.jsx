import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function ViewQuestionnaire() {
  const { toast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const [questionnaire, setQuestionnaire] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [score, setScore] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      try {
        const response = await questionnaireAPI.getById(id);
        if (response.ok) {
          const data = await response.json();
          setQuestionnaire(data.questionnaire);
          setIsOwner(data.isOwner);
          setAttempts(data.attempts || []);

          const completedQuestionnaires = JSON.parse(
            localStorage.getItem("completedQuestionnaires") || "[]"
          );
          if (
            completedQuestionnaires.includes(data.questionnaire.shareableLink)
          ) {
            setHasCompleted(true);
            setShowCompletionModal(true);
          }
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to fetch questionnaire",
          });
          navigate("/login");
        }
      } catch (error) {
        console.error("Error:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "An error occurred. Please try again.",
        });
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionnaire();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const answers = [];

    questionnaire.questions.forEach((_, index) => {
      answers.push(formData.get(`q${index}`));
    });

    try {
      const response = await questionnaireAPI.submitAnswers(id, answers);
      const data = await response.json();
      if (response.ok) {
        setScore(data.score);
        setShowCompletionModal(true);

        const completedQuestionnaires = JSON.parse(
          localStorage.getItem("completedQuestionnaires") || "[]"
        );
        completedQuestionnaires.push(questionnaire.shareableLink);
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
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `http://localhost:5173/q/${questionnaire.shareableLink}`
    );
    toast({
      title: "Link copied",
      description: "Shareable link has been copied to clipboard",
    });
  };

  const CompletionModal = () => (
    <Dialog open={showCompletionModal} onOpenChange={setShowCompletionModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Thank You!</DialogTitle>
          <DialogDescription className="text-center space-y-2">
            <p>Your answers have been submitted successfully.</p>
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
              navigate(-1);
            }}
          >
            Back to Dashboard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  const AttemptsView = () => (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Submission Attempts</CardTitle>
        <CardDescription>
          View all attempts for this questionnaire
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {attempts.length === 0 ? (
            <p className="text-muted-foreground">No attempts yet</p>
          ) : (
            attempts.map((attempt, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b py-2"
              >
                <Link 
                  to={`/questionnaire/${id}/attempts/${attempt._id}`}
                  className="text-black items-center flex gap-1 hover:underline"
                >
                  <span>Attempt {attempts.length - index}</span>
                </Link>
                <span className="font-bold">{attempt.score}%</span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (loading)
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-[calc(100vh-100px)]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
        </div>
      </div>
    );

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="container max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{questionnaire.title}</CardTitle>
            <CardDescription>
              Created by: {questionnaire.creator.firstName}{" "}
              {questionnaire.creator.lastName} ({questionnaire.creator.position}
              )
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Input
                readOnly
                value={`http://localhost:5173/q/${questionnaire.shareableLink}`}
                className="font-mono text-sm"
              />
              <Button variant="outline" size="icon" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {isOwner ? (
          <AttemptsView />
        ) : hasCompleted ? (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Questionnaire Already Completed</CardTitle>
              <CardDescription>
                You have already submitted your answers for this questionnaire.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {questionnaire.questions.map((question, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Question {index + 1}
                  </CardTitle>
                  <CardDescription>{question.question}</CardDescription>
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
                        <Label
                          htmlFor={`q${index}a${answerIndex}`}
                          className="text-sm"
                        >
                          {answer}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            ))}

            <Button type="submit" className="w-full">
              Submit Answers
            </Button>
          </form>
        )}
      </div>
      {!isOwner && <CompletionModal />}
    </div>
  );
}
