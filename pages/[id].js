import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Typography, Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Image from "next/image";
import pics from "../public/image/second.jpg";
// import pics from "../public/image/blankimg.png";
import Rating from "@mui/material/Rating";
import styles from "../styles/Home.module.css";

const showParticularShow = () => {
  const router = useRouter();
  const { id } = router.query;
  const [scheuledData, setScheduledData] = useState([]);
  const [rating, setRating] = useState()

  // api call-- for details
  useEffect(() => {
    if (id) {
      loadScheduleCard();
    }
  }, [id]);
  const loadScheduleCard = async () => {
    await fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setScheduledData(res);
      });
  };
  // for days
  const weeks = scheuledData?.schedule?.days;
  const First = weeks && weeks[0];
  // for genres
  const genres = scheuledData?.genres;
  const FirstEl = genres && genres[0];
  //for summary
  const str = scheuledData?.summary;

  // for rating state change
const changeRating = (setscheuledData)=>{
  setRating({
    rating: setscheuledData?.rating?.average
  })
}

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.header}>
          <div className={styles.heading}>
            <h4>TV Bland</h4>
          </div>
          <Grid
          item
            className={styles.position_top}
            container
            xs={12}
            gap={"30px"}
            sx={{ position: "relative", top: "52px" }}
          >
            <Grid item className={styles.img_size}>
              {scheuledData.image ? (
                <Image
                  className={styles.img_size}
                  src={scheuledData.image.original}
                  alt="movie_Pics"
                  width={200}
                  height={350}
                />
              ) : (
                <Image
                  src={pics}
                  alt="movie_Pics"
                  width={200}
                  height={350}
                />
              )}
            </Grid>
            <Grid item className={styles.mt}>
              <Grid sx={{ display: "flex", marginBottom: "15px" }}>
                <Rating
                  name="read-only"
                  value={rating}
                  readOnly
                />
                <Typography mt={"3px"} ml={"5px"}>
                  4.5/5
                </Typography>
              </Grid>
              <Typography
                variant="h4"
                component="h4"
                sx={{ marginBottom: "15px" }}
              >
                {scheuledData?.name}
              </Typography>
              <Typography sx={{ color: "hsl(0deg 0% 13% / 88%)" }}>
                {str?.replace(/(<([^>]+)>)/gi, "")}
              </Typography>
            </Grid>
          </Grid>
        </div>
        <div className={styles.middleContainer}>
          <Grid
            className={styles.main_mid}
            container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Grid item className={styles.mid_width}>
              <Typography variant="h5" component="h4" marginBottom={"40px"}>
                Show info
              </Typography>
              <Grid className={styles.mid_sec}>
                <Grid
                item
                  className={styles.border_top_first}
                  container
                  alignItems={"center"}
                  xs={12}
                >
                  <Grid item className={styles.table_name}>
                    <Typography fontSize={"14px"} fontWeight={"600"}>
                      Streamed on
                    </Typography>
                  </Grid>
                  <Grid item className={styles.table_name} xs={6}>
                    <Typography fontSize={"12px"}>
                      {scheuledData?.network?.name}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                item
                  className={styles.border_top}
                  container
                  alignItems={"center"}
                  xs={12}
                >
                  <Grid item className={styles.table_name}>
                    <Typography fontSize={"14px"} fontWeight={"600"}>
                      Schedule
                    </Typography>
                  </Grid>
                  <Grid item className={styles.table_name} xs={6}>
                    <Typography fontSize={"12px"}>{First}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid className={styles.mid_sec}>
                <Grid
                item
                  className={styles.border_top}
                  container
                  alignItems={"center"}
                  xs={12}
                >
                  <Grid item className={styles.table_name}>
                    <Typography fontSize={"14px"} fontWeight={"600"}>
                      Status
                    </Typography>
                  </Grid>
                  <Grid item className={styles.table_name} xs={6}>
                    <Typography fontSize={"12px"}>
                      {scheuledData?.status}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                item
                  className={styles.border_top}
                  container
                  alignItems={"center"}
                  xs={12}
                >
                  <Grid item className={styles.table_name}>
                    <Typography fontSize={"14px"} fontWeight={"600"}>
                      Genres
                    </Typography>
                  </Grid>
                  <Grid item className={styles.table_name} xs={6}>
                    <Typography fontSize={"12px"}>{FirstEl}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={styles.mid_width}>
              <Typography variant="h5" component="h4" marginBottom={"40px"}>
                Starring
              </Typography>
              <Grid
              item
                className={styles.border_first}
                container
                alignItems={"center"}
                xs={12}
              >
                <Grid item className={styles.avatar_img} xs={2}>
                  <Avatar className={styles.avatar_img_size} src="/broken-image.jpg" />
                </Grid>
                <Grid className={styles.mid_se}>
                  <Grid
                    className={styles.down}
                    item
                    xs={5}
                  >
                    <Typography fontSize={"14px"} fontWeight={"600"}>
                      Victoria Alcock
                    </Typography>
                  </Grid>
                  <Grid item className={styles.down_last} xs={5}>
                    <Typography fontSize={"12px"}>
                      {scheuledData?.type}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
              item
                className={styles.border}
                container
                alignItems={"center"}
                xs={12}
              >
                <Grid item className={styles.avatar_img} xs={2}>
                  <Avatar className={styles.avatar_img_size} src="/broken-image.jpg" />
                </Grid>
                <Grid className={styles.mid_se}>
                  <Grid
                    className={styles.down}
                    item
                    xs={5}
                  >
                    <Typography fontSize={"14px"} fontWeight={"600"}>
                      Hugo Chegwin
                    </Typography>
                  </Grid>
                  <Grid item className={styles.down_last} xs={5}>
                    <Typography fontSize={"12px"}>
                      {scheuledData?.network?.name}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
              item
                className={styles.border}
                container
                alignItems={"center"}
                xs={12}
              >
                <Grid item className={styles.avatar_img} xs={2}>
                  <Avatar className={styles.avatar_img_size} src="/broken-image.jpg" />
                </Grid>
                <Grid className={styles.mid_se}>
                  <Grid
                    className={styles.down}
                    item
                    xs={5}
                  >
                    <Typography fontSize={"14px"} fontWeight={"600"}>
                      Allan Mustufa
                    </Typography>
                  </Grid>
                  <Grid item className={styles.down_last} xs={5}>
                    <Typography fontSize={"12px"}>
                      {scheuledData?.network?.country?.name}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
              item
                className={styles.border}
                container
                alignItems={"center"}
                xs={12}
              >
                <Grid item className={styles.avatar_img} xs={2}>
                  <Avatar className={styles.avatar_img_size} src="/broken-image.jpg" />
                </Grid>
                <Grid className={styles.mid_se}>
                  <Grid
                    className={styles.down}
                    item
                    xs={5}
                  >
                    <Typography fontSize={"14px"} fontWeight={"600"}>
                      Daniel Sylvester
                    </Typography>
                  </Grid>
                  <Grid item className={styles.down_last} xs={5}>
                    <Typography fontSize={"12px"}>
                      Decoy
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className={styles.footer}></div>
    </div>
  );
};

export default showParticularShow;
