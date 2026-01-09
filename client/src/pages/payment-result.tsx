import { useEffect, useState } from "react";
import { Link, useSearch } from "wouter";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function PaymentResultPage() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const status = params.get("status");
  const email = params.get("email") || "customer@example.com";
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const isSuccess = status === "success";

  useEffect(() => {
    const sendEmail = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setEmailSent(true);

      toast({
        title: isSuccess
          ? "Confirmation email sent!"
          : "Payment notification sent",
        description: `An email has been sent to ${email}`,
      });
    };

    sendEmail();
  }, [email, isSuccess, toast]);

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {isSuccess ? (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-8"
              >
                <CheckCircle className="h-12 w-12 text-green-600" />
              </motion.div>
              <h1
                className="text-3xl md:text-4xl font-bold mb-4"
                data-testid="text-payment-success"
              >
                Payment Successful!
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Thank you for your purchase. Your order has been confirmed and
                will be shipped shortly.
              </p>
            </>
          ) : (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-8"
              >
                <XCircle className="h-12 w-12 text-red-600" />
              </motion.div>
              <h1
                className="text-3xl md:text-4xl font-bold mb-4"
                data-testid="text-payment-failed"
              >
                Payment Failed
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Unfortunately, your payment could not be processed. Please try
                again or use a different payment method.
              </p>
            </>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-2xl border border-border/50 p-6 mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mail className="h-5 w-5 text-primary" />
              <span className="font-medium">Email Notification</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {emailSent ? (
                <span className="text-green-600 flex items-center justify-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Email sent to {email}
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  Sending email to {email}...
                </span>
              )}
            </p>
            <p className="text-xs text-muted-foreground mt-3" data-testid="text-email-notification">
              {isSuccess
                ? "You will receive an order confirmation with tracking details."
                : "You will receive details about the failed transaction."}
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isSuccess ? (
              <Link href="/">
                <a>
                  <Button
                    size="lg"
                    className="rounded-full px-8"
                    data-testid="button-continue-shopping"
                  >
                    Continue Shopping
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </Link>
            ) : (
              <>
                <Link href="/checkout">
                  <a>
                    <Button
                      size="lg"
                      className="rounded-full px-8"
                      data-testid="button-try-again"
                    >
                      Try Again
                    </Button>
                  </a>
                </Link>
                <Link href="/">
                  <a>
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full px-8"
                      data-testid="button-back-to-shop"
                    >
                      Back to Shop
                    </Button>
                  </a>
                </Link>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
