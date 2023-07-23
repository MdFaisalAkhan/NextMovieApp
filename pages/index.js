import { Typography, Grid } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import pics from "../public/image/second.jpg";
// import pics from "../public/image/blankimg.png";
import styles from "../styles/Home.module.css";
import Rating from "@mui/material/Rating";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [scheuledData, setScheduledData] = useState([]);

  // api call--
  useEffect(() => {
    loadScheduleCard();
  }, []);
  const loadScheduleCard = async () => {
    await fetch("https://api.tvmaze.com/schedule")
      .then((res) => res.json())
      .then((res) => {
        setScheduledData(res);
      });
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.headerMain}>
          <div className={styles.heading}>
            <h4>TV Bland</h4>
          </div>
          <div className={styles.textLine}>
            <p>TV shows and web serease database.</p>
            <p>
              Create Personalised schedules. Episode guide, cast, crew and
              character information.
            </p>
          </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.heading}>
            <Typography variant="h6" component="h5">
              Last Added Shows
            </Typography>
          </div>
          <div className={styles.CardWrapper}>
            <div>
              <Grid container gap={"10px"} justifyContent={"space-between"}>
                {scheuledData?.map((item,id) => {
                  return (
                    <Grid key={id} style={{ maxWidth: "185px" }}>
                      <Grid
                        className={styles.size}
                        marginBottom={"10px"}
                        onClick={() => {
                          router.push(`/${item.show.id}`);
                        }}
                      >
                        {item.image ? (
                          <Image
                            src={item.image.original}
                            alt="movie_Pics"
                            layout="fill"
                            objectFit={"unset"}
                          />
                        ) : (
                          <Image
                            src={pics}
                            alt="movie_Pics"
                            layout="fill"
                            objectFit={"unset"}
                          />
                        )}
                      </Grid>
                      <Grid mt={"10px"}>
                        <Rating
                          name="read-only"
                          value={item?.rating?.average}
                          readOnly
                        />
                      </Grid>
                      <Typography
                        className={styles.pragraph}
                        fontSize={"14px"}
                        marginBottom={"10px"}
                        marginTop={"10px"}
                      >
                        {item?.name}
                      </Typography>
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}></div>
    </div>
  );
}
