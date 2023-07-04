import { useEffect } from "react";
import c3 from "c3";
import "c3/c3.css";
import styles from "../styles/Home.module.css";

export default function Chart({ data }) {
  useEffect(() => {
    if (data.length > 0) {
      const freq = {};
      data.forEach((entry) => {
        const reason = entry.reason;
        freq[reason] = freq[reason] ? freq[reason] + 1 : 1;
      });

      const chart = c3.generate({
        bindto: "#chart",
        data: {
          columns: Object.entries(freq),
          type: "pie",
        },
      });

      //   return () => {
      //     chart.destroy();
      //   };
    }
  }, [data]);

  return (
    <>
      {data.length > 0 ? <h2 className={styles.chartTitle}>Details</h2> : null}
      <div id="chart"></div>
    </>
  );
}
