import dataThistle from '../scraping/dataThistle';
import mmaGlobal from '../scraping/mmaGlobal';
import timesDotCom from '../scraping/timesDotCom';

const main = async () => {
  let url = '';
  url = "https://www.datathistle.com/";
  dataThistle(url);

  url = "https://www.mmaglobal.com/events";
  mmaGlobal(url);
  const urlArray = [
    "https://10times.com/events",
    "https://10times.com/usa",
    "https://10times.com/unitedkingdom",
    "https://10times.com/germany",
    "https://10times.com/india"
  ]
  for (let url of urlArray) {
    timesDotCom(url);
  }
}

export default main;
