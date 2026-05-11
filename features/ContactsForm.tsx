"use client";
import React, { useRef } from "react";

import { useForm } from "react-hook-form";

import emailjs from "@emailjs/browser";

import { AnimatePresence, motion } from "framer-motion";

import { toast, ToastContainer } from "react-toastify";

import "@/styles/features/contactsForm.css";

const ContactsForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const { formState, register, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const sendEmail = () => {
    emailjs
      .sendForm(
        `${process.env.NEXT_PUBLIC_SERVICE_ID}`,
        `${process.env.NEXT_PUBLIC_TEMPLATE_ID}`,
        formRef.current as HTMLFormElement,
        {
          publicKey: `${process.env.NEXT_PUBLIC_PUBLIC_KEY}`,
        },
      )
      .then(
        () => {
          console.debug("Успешная отправка письма");

          toast.success("Письмо отправлено", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            className: `send-message font-ru-primary`,
          });
          reset();

          // setTimeout(() => setFormDisplay(!formDisplay), 5000);
        },
        (error) => {
          console.debug("Неудачная отправка письма", error.text);

          toast.error("Письмо не отправлено, проверьте соединение", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            className: `send-message font-ru-primary`,
          });
        },
      );
  };
  return (
    <>
      <AnimatePresence>
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          exit={{ opacity: 0 }}
          ref={formRef}
          onSubmit={handleSubmit(sendEmail)}
          className="contactsForm"
        >
          <div className="contactsForm-field">
            <label>Имя / Организация</label>

            <input
              id="name"
              type="text"
              autoComplete="off"
              {...register("name", {
                required: "Введите ваше имя или организация",
                pattern: {
                  value: /^[a-zA-Zа-яА-ЯёЁ][a-zA-Z0-9а-яА-ЯёЁ]{2,}/,
                  message:
                    "Пожалуйста введите правильное имя или организацию.",
                },
              })}
            />

            {errors?.name && (
              <p className="text-red-400 text-[12px]">
                {errors?.name?.message as string}
              </p>
            )}
          </div>

          <div className="contactsForm-field">
            <label>Почта</label>

            <input
              id="email"
              type="email"
              autoComplete="off"
              {...register("email", {
                required: "Введите ваш почтовый адрес",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Пожалуйста введите правильный почтовый адрес",
                },
              })}
            />

            {errors?.email && (
              <p className="text-red-400 text-[12px]">
                {errors?.email?.message as string}
              </p>
            )}
          </div>

          <div className="contactsForm-field">
            <label>Сообщение</label>

            <textarea
              id="message"
              {...register("message", {
                required:
                  "Мне будет приятно прочитать то, что вы хотите сказать.",
              })}
            />

            {errors?.message && (
              <span className="text-red-400 text-[12px]">
                {errors?.message?.message as string}
              </span>
            )}
          </div>

          <button
            data-blobity-magnetic="false"
            data-blobity-radius="10"
            className="contactsForm-sendButton"
          >
            <p className="contactsForm-sendButton-text">Отправить</p>
          </button>
        </motion.form>
      </AnimatePresence>

      {/* <ToastContainer /> */}
    </>
  );
};

export default ContactsForm;