import { useState } from "react";
import {
  Stepper,
  Step,
  Button,
  Typography,
  Card,
  CardBody,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  CogIcon,
  UserIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

export function CustomerRegForm({ emailSubmitted, backToPhaseOne }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  console.log("Email submitted:", emailSubmitted);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => {
    if (isFirstStep) {
      backToPhaseOne(false); // Go back to email validation
    } else {
      setActiveStep((cur) => cur - 1);
    }
  };

  const renderFormContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <form>
              <Typography variant="h5" className="mb-4">
                Account Details
              </Typography>
              <div className="grid gap-2 grid-cols-2">
                <span className="col-span-2">
                  <Input
                    label="Username"
                    type="text"
                    placeholder="Enter your username"
                  />
                </span>
                <span className="col-span-2">
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                  />
                </span>
              </div>
            </form>
          </>
        );
      case 1:
        return (
          <>
            <form>
              <Typography variant="h5" className="mb-4">
                Personal Details
              </Typography>
              <div className="grid gap-2 grid-cols-1 lg:grid-cols-2">
                <Input
                  label="First Name"
                  type="text"
                  placeholder="Enter your username"
                />

                <Input
                  label="Middle Name (Optional)"
                  type="text"
                  placeholder="Enter your username"
                />
                <span className="col-span-1 lg:col-span-2">
                  <Input
                    label="Last Name"
                    type="text"
                    placeholder="Enter your username"
                  />
                </span>
                <div className="w-full">
                  <Input
                    maxLength={16}
                    label="Contact Number"
                    placeholder="e.g., +1 123-456-7890"
                    pattern="^\+\d{1,3}\s\d{1,4}-\d{1,4}-\d{4}$"
                    className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4 text-blue-gray-600"
                      >
                        <path d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" />
                      </svg>
                    }
                  />
                </div>
                <div className="w-full">
                  <Select label="Select Department">
                    <Option>Material Tailwind HTML</Option>
                    <Option>Material Tailwind React</Option>
                    <Option>Material Tailwind Vue</Option>
                    <Option>Material Tailwind Angular</Option>
                    <Option>Material Tailwind Svelte</Option>
                  </Select>
                </div>
              </div>
            </form>
          </>
        );
      case 2:
        return (
          <>
            <Typography variant="h5" className="mb-4">
              Confirm Details
            </Typography>
            <Input label="Company Name" placeholder="Enter company name" />
            <Input label="Position" placeholder="Your position at company" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full lg:px-24 lg:py-4 z-0">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step onClick={() => setActiveStep(0)}>
          <UserIcon className="h-5 w-5" />
          <div className="hidden sm:inline-block absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 0 ? "blue-gray" : "gray"}
            >
              Step 1
            </Typography>
            <Typography
              color={activeStep === 0 ? "blue-gray" : "gray"}
              className="font-normal"
            >
              Account Information
            </Typography>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(1)}>
          <CogIcon className="h-5 w-5" />
          <div className="hidden sm:inline-block absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 1 ? "blue-gray" : "gray"}
            >
              Step 2
            </Typography>
            <Typography
              color={activeStep === 1 ? "blue-gray" : "gray"}
              className="font-normal"
            >
              Profile Information
            </Typography>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(2)}>
          <BuildingLibraryIcon className="h-5 w-5" />
          <div className="hidden sm:inline-block absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 2 ? "blue-gray" : "gray"}
            >
              Step 3
            </Typography>
            <Typography
              color={activeStep === 2 ? "blue-gray" : "gray"}
              className="font-normal"
            >
              Confirm Information
            </Typography>
          </div>
        </Step>
      </Stepper>

      <div className="flex mt-8  sm:mt-28 justify-center">
        <Card className="w-full sm:w-[75%] p-0 sm:p-6 border border-gray-300">
          <CardBody >{renderFormContent()}</CardBody>
        </Card>
      </div>

      <div className="mt-8 flex justify-between">
        <Button onClick={handlePrev}>Prev</Button>
        <Button onClick={handleNext} disabled={isLastStep}>
          Next
        </Button>
      </div>
    </div>
  );
}
