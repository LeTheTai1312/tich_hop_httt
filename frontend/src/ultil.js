export const iDate = (date, stringFormat) => {
    try {
      let t;
  
      if (/(^\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2}$)/.test(date)) {
        date = date?.split(/\D+/) || [];
        date[1] = Number(date[1]) - 1;
        t = new Date(...date);
      } else {
        t = new Date(date || new Date());
      }
  
      if (!t.getDate()) {
        return "";
      }
  
      const s = Number(t);
      const h = t.getHours();
      const o = {
        D: t.getDay(), // index ngày trong tuần (number)
        H: t.getHours(), // giờ (number/H)
        J: t.getDate(), //ngày trong tháng (number)
        M: t.getMinutes(), //phút (number/M)
        N: t.getMonth() + 1, //tháng Việt Nam (number)
        O: t, //(Date)
        S: t.getSeconds(), // giây (number)
        d: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"][t.getDay()], //thứ Việt nam (String)
        f: t.getFullYear(), //năm (number)
        h: ("0" + t.getHours()).substr(-2), //giờ (String)
        j: ("0" + t.getDate()).substr(-2), // ngày (String)
        m: ("0" + t.getMinutes()).substr(-2), //phút (String)
        n: ("0" + (t.getMonth() + 1)).substr(-2), // tháng (String)
        s: ("0" + t.getSeconds()).substr(-2), //giây (String)
        t: s, //mls (number)
        u: parseInt(s / 1000), //timestamp (number)
        y: String(t.getFullYear()).substr(-2), //2 số cuối của năm (String)
        A: t.getHours() >= 12 ? "PM" : "AM", // AM PM                 t>new Date (t.getFullYear,t.getMonth(),t.getDate,12,"01","00")
        g: ("0" + (h === 0 ? 12 : h > 12 ? h - 12 : h)).substr(-2), // Trả về định dạng 12 giờ
        Month: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ][t.getMonth()],
        Mo: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ][t.getMonth()],
      };
      if (typeof stringFormat === "string") {
        return stringFormat.replace(
          /{(Mo|Month|.)}/g,
          (a) => o[a.replace(/[{}]/g, "")]
        );
      }
  
      return o;
    } catch (error) {
      // console.log("error", error);
  
      return date;
    }
  };

  export  function generateRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function getFileFromDataUrl(dataUrl){
  let data = await fetch(dataUrl)
  .then(res => res.blob())
  .then(blob => {
    const file = new File([blob], "File name",{ type: "image/png" });
    return file
  })
  return data
}


export async function getScreenshot(idVideo="video", scale=0.5) {
  let videoEl = document.getElementById(idVideo);
  if (!videoEl) return
  scale = scale || 1;

  const canvas = document.createElement("canvas");
  // const canvas = document.getElementById("canvas");
  canvas.width = videoEl.videoWidth * scale;
  canvas.height = videoEl.videoHeight * scale;
  canvas.getContext('2d').drawImage(videoEl, 0, 0, canvas.width, canvas.height);
  // videoEl.style.backgroundImage = `url(${canvas.toDataURL()})`

  // // img.src = canvas.toDataURL('image/png');;
  // // document.getElementById("image").src = img.src
  // var image = new Image();
  // const img = document.getElementById("image");

  // var data = canvas.toDataURL();
  // console.log(`data`, data)
  // image.crossOrigin = 'anonymous'
  // image.setAttribute('src', data);
  // img.src = image.src


  var data = canvas.toDataURL();
  let imageDetect = await getFileFromDataUrl(data)


  return imageDetect;

}



export const toggleVideo = (pause, idVideo='video') => {
  try {
      let videoDom = document.getElementById(idVideo);
      if (!videoDom) return
      let isPause = pause || videoDom?.paused
      if (!isPause) videoDom.pause()
      else if (isPause) videoDom.play()
  }
  catch (e) {
  }
}

export const reloadVideo = (idVideo='video')=> {
  try {
      let videoDom = document.getElementById(idVideo);

      if (!videoDom) return
      videoDom.pause();
      videoDom.currentTime = 0;
      videoDom.play();

  }
  catch (e) {
  }
}
