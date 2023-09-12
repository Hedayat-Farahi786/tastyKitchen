import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Label, TextInput, Textarea } from "flowbite-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";
import { useForm } from "react-hook-form";
// import emailjs from "emailjs-com";

const GetInTouch = () => {
  const [loading, setLoading] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2, // Adjust this threshold value as needed
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  const imageVariants = {
    hidden: {
      opacity: 0,
      x: -50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      x: 50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    setLoading(true);

    // // Format the form data as you like for the email body
    // const emailData = {
    //   company: data.company,
    //   name: data.name,
    //   phone: data.phone,
    //   email: data.email,
    //   projectDetails: data.projectDetails,
    //   //   agree: data.agree ? 'Agreed' : 'Not Agreed', // Assuming agree is a checkbox
    // };

    // Send the email using EmailJS
    // emailjs
    //   .send(
    //     "service_6f4gggs",
    //     "template_iouoqvg",
    //     emailData,
    //     "Wz0e517C1GC6puU6-"
    //   )
    //   .then((response) => {
    //     props.setOpenModal("pop-up-suc");
    //     setLoading(false);

    //     reset(); // Reset the form after successful submission
    //   })
    //   .catch((error) => {
    //     props.setOpenModal("pop-up-err");
    //     setLoading(false);
    //   });

    console.log(data);
    console.log(errors);
    setLoading(false);
  };

  return (
    <section id="getInTouch" className="w-11/12 mx-auto pt-[10vh] md:py-20 mb-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row md:space-x-20 items-center">
          <motion.div
            className="md:w-1/2 flex flex-col mt-28 md:mt-0"
            ref={ref}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={imageVariants}
          >
            <h2 className="text-center md:text-left text-3xl md:text-3xl font-bold mb-8">
              Kontaktiere uns
              <span className="text-primary ml-2">
                jetzt!
              </span>{" "}
              !
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5 w-full"
            >
              <div className="flex flex-col md:flex-row space-x-0 md:space-x-3 space-y-4 md:space-y-0 w-full">
                <div className="w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="email" value="E-mail" />
                  </div>
                  <TextInput
                    id="email"
                    {...register("email", { required: true })}
                    placeholder="Max@mustermann.com..."
                    shadow
                    type="email"
                    name="email"
                    color={errors.email ? "failure" : ""}
                    helperText={errors.email && <span>E-mail ist erforderlich</span>}
                    className="w-full"
                  />
                </div>
                <div className="w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="name" value="Vor- und Zuname" />
                  </div>
                  <TextInput
                    id="name"
                    {...register("name", { required: true })}
                    placeholder="Max Mustermann..."
                    shadow
                    type="text"
                    color={errors.name ? "failure" : ""}
                    helperText={errors.name && <span>Vollständiger Name ist erforderlich</span>}
                    name="name"
                    className="w-full"
                  />
                </div>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="message" value="Nachricht" />
                </div>
                <Textarea
                  id="message"
                  {...register("message", { required: true })}
                  placeholder="Ihre Nachricht..."
                  shadow
                  color={errors.message ? "failure" : ""}
                  helperText={
                    errors.message && <span>Nachricht is erforderlich</span>
                  }
                  name="message"
                  rows={6}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-primary flex items-center justify-center text-white py-2 font-semibold rounded place-self-auto md:place-self-start uppercase px-8 mt-5 disabled:opacity-60"
              >
                {loading && (
                  <AiOutlineLoading3Quarters className="mr-3 h-4 w-4 animate-spin" />
                )}
                <p>Senden</p>
                <IoMdSend className="ml-3 h-4 w-4" />
              </button>
            </form>
          </motion.div>
          <motion.div
            className="md:w-1/2"
            ref={ref}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={textVariants}
          >
            <div className="h-full w-full pt-10">
              <iframe
                title="Map Location"
                width="100%"
                className="h-[300px] md:h-[500px]"
                frameBorder="0"
                style={{ border: 0 }}
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10633.6413353566!2d11.5253082!3d48.2179728!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479e77d4227d5c59%3A0x137aabd8c68f4f13!2sTasty%20Kitchen!5e0!3m2!1sde!2sde!4v1690543183670!5m2!1sde!2sde"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
