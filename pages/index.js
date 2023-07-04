import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import dynamic from "next/dynamic";
import * as yup from "yup";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const DynamicChart = dynamic(() => import("../components/Chart"), {
  ssr: false,
});

const schema = yup.object().shape({
  fname: yup.string().required("Please enter first name"),
  lname: yup.string().required("Please enter first name"),
  age: yup.number().required("Please enter age"),
  height: yup.number().required("Please enter height"),
  weight: yup.number().required("Please enter weight"),
  reason: yup
    .string()
    .oneOf(
      [
        "To get fit",
        "To build muscle",
        "To lose weight",
        "To improve overall health",
      ],
      "Please select an appropriate option"
    ),
});

export default function Home() {
  const [data, setData] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    // mode: "onChange",
    // reValidateMode: "onBlur",
  });

  const onSubmit = (data) => {
    setData((prevData) => [...prevData, data]);
    reset();
  };

  return (
    <>
      <Head>
        <title>Gym Survey</title>
      </Head>

      <div className={styles.header}>
        <div className={styles.headerTitle}>Survey App</div>
      </div>

      <div className={styles.layout}>
        <div className={styles.page}>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className={styles.formField}>
              <label htmlFor="fname">First Name:</label>
              <input id="fname" {...register("fname")} />
              {errors.fname && (
                <div className={styles.errorMessage}>
                  {errors.fname.message}
                </div>
              )}
            </div>
            <div className={styles.formField}>
              <label htmlFor="lname">Last Name:</label>
              <input id="lname" {...register("lname")} />
              {errors.lname && (
                <div className={styles.errorMessage}>
                  {errors.lname.message}
                </div>
              )}
            </div>
            <div className={styles.formField}>
              <label htmlFor="age">Age:</label>
              <input id="age" {...register("age")} />
              {errors.age && (
                <div className={styles.errorMessage}>{errors.age.message}</div>
              )}
            </div>
            <div className={styles.formField}>
              <label htmlFor="weight">Weight:</label>
              <input id="weight" {...register("weight")} />
              {errors.weight && (
                <div className={styles.errorMessage}>
                  {errors.weight.message}
                </div>
              )}
            </div>
            <div className={styles.formField}>
              <label htmlFor="height">Height:</label>
              <input id="height" {...register("height")} />
              {errors.height && (
                <div className={styles.errorMessage}>
                  {errors.height.message}
                </div>
              )}
            </div>
            <div className={styles.formField}>
              <label htmlFor="reason">Why do you want to join the gym?</label>
              <select id="reason" {...register("reason")}>
                <option value="">Select an option</option>
                <option value="To get fit">To get fit</option>
                <option value="To build muscle">To build muscle</option>
                <option value="To lose weight">To lose weight</option>
                <option value="To improve overall health">
                  To improve overall health
                </option>
              </select>
              {errors.reason && (
                <div className={styles.errorMessage}>
                  {errors.reason.message}
                </div>
              )}
            </div>
            <button className={styles.subButton} type="submit">
              Submit
            </button>
          </form>
        </div>

        <div className={styles.chartContainer}>
          <DynamicChart data={data} />
        </div>
      </div>
    </>
  );
}
