import { useEffect, useState } from "react";
import { questionnaireAPI } from "../services/api";
import { useParams, Link, useNavigate } from "react-router-dom";
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
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function ViewQuestionnaire() {
  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState(null);
  const [questionnaire, setQuestionnaire] = useState(null);
  const { questionID, attemptID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      try {
        const response = await questionnaireAPI.getById(questionID);
        if (response.ok) {
          const data = await response.json();
          setQuestionnaire(data.questionnaire);
          const currentAttempt = data.attempts.filter(
            (attempt) => attempt._id == attemptID
          );
          setAttempt(currentAttempt[0]);
        }
      } catch (error) {
        console.error("Error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionnaire();
  }, [questionID]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `http://localhost:5173/q/${questionnaire.shareableLink}`
    );
    toast({
      title: "Link copied",
      description: "Shareable link has been copied to clipboard",
    });
  };

  if (attempt) {
    console.log(attempt);
  }

  if (loading)
    return (
      <div className="container py-10 mx-auto">
        <div className="flex items-center justify-center h-[calc(100vh-100px)]">
          <div className="w-32 h-32 border-b-2 border-gray-900 rounded-full dark:border-white animate-spin" />
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
            <ArrowLeft className="w-4 h-4" /> Back
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
            <p>Score: {attempt.score}%</p>
          </CardContent>
        </Card>
        <div className="space-y-6">
          {questionnaire.questions.map((question, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                <CardDescription>{question.question}</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup name={`q${index}`} required className="space-y-3">
                  {question.answers.map((answer, answerIndex) => (
                    <div
                      key={answerIndex}
                      className={`flex items-center space-x-2 ${
                        attempt.answers[index] === question.correctAnswer &&
                        answerIndex === question.correctAnswer
                          ? "text-green-600" // Correct answer color
                          : attempt.answers[index] === answerIndex
                          ? "text-red-500" // Incorrect answer color
                          : ""
                      }
                    ${
                      answerIndex === question.correctAnswer && "text-green-600"
                    }`}
                    >
                      <RadioGroupItem
                        value={answerIndex.toString()}
                        id={`q${index}a${answerIndex}`}
                        checked={attempt.answers[index] === answerIndex}
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
        </div>
      </div>
    </div>
  );
}
