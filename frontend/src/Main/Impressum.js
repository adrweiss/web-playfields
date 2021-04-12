import React, { useState } from 'react'
import './Impressum.css'

import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const AntSwitch = withStyles((theme) => ({
  root: {
    width: 60,
    height: 22,
    padding: 4,
    display: 'flex',
  },
  switchBase: {
    padding: 7,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(32px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `2px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

function Impressum() {
  const [state, setState] = useState(true)

  const handleChange = (event) => {
    setState(!state);
  };

  return (
    <div>
      <div className="impressum__base__container">
        <div className="impressum__base__language">
          
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
                <div className="impressum__language__slider">
                  <Grid item>German</Grid>
                    <Grid item>
                      <AntSwitch checked={state} onChange={handleChange} name="checked" />
                    </Grid>
                  <Grid item>English</Grid>
                </div>
              </Grid>
            </Typography>
          
        </div>

        <div hidden={!state}>

          <div className="impressum__note">        
            <h3>Note</h3>                  
            This is a private project. It is a technology playground that is used to try out concepts and technologies. 
            The findings will be shared (no personal data) and published where applicable. All implementations and publications are always implemented to the best of our knowledge. 
            However, if you notice any errors, please let me know. I will always try to correct the errors immediately. If this is not possible the  website will be taken offline temporarily.
          </div>
          
          <h1>Legal Disclosure</h1>
          <h2>Information in accordance with Section 5 TMG</h2>
          <p>
            Contact: Adrian Weiss
          </p>
          <h2>Contact Information</h2>
          Adrian Weiss<br />
          E-Mail: <a href="mailto:service@playfields.de">service@playfields.de</a><br />
          Internet address: <a href="playfields.de" target="_blank">playfields.de</a><br />
          {/*
          <h2>Graphics and Image Sources</h2>
          Bildquellen<br/><br/>
          */}
          <h2>Disclaimer</h2>

          <h3>Accountability for content</h3>
          The contents of our pages have been created with the utmost care. However, we cannot guarantee the contents'
          accuracy, completeness or topicality. According to statutory provisions, we are furthermore responsible for
          our own content on these web pages. In this matter, please note that we are not obliged to monitor
          the transmitted or saved information of third parties, or investigate circumstances pointing to illegal activity.
          Our obligations to remove or block the use of information under generally applicable laws remain unaffected by this as per
          §§ 8 to 10 of the Telemedia Act (TMG).

          <h3>Accountability for links</h3>
          Responsibility for the content of external links (to web pages of third parties) lies solely with the operators of the linked pages. No violations were
          evident to us at the time of linking. Should any legal infringement become known to us, we will remove the respective
          link immediately.

          <h3>Copyright</h3>
          Our web pages and their contents are subject to German copyright law. Unless expressly permitted by law, every form of utilizing, reproducing or processing
          works subject to copyright protection on our web pages requires the prior consent of the respective owner of the rights. Individual reproductions of a work
          are only allowed for private use. The materials from these pages are copyrighted and any unauthorized use may violate copyright laws.<br /><br />

          <i>Quelle: </i><a href="http://www.translate-24h.de" >translate-24h Übersetzungen</a> <br /><br />
        </div>

        <div hidden={state}>
          
          <div className="impressum__note">        
            <h3>Notiz</h3>                  
            Es handelt sich hierbei um ein privates Projekt. Dabei geht es um eine Technologie-Spielwiese, die dazu genuzt wird, Konzepte und Technologien auszuprobieren. 
            Die Erkentnisse daraus werden ggf. geteilt und veröffentlicht (keine persönlichen Daten). Sämtliche Implementierungen und Veröffentlichungen sind stets nach bestem Wissen und Gewissen umgesetzt. 
            Falls Ihnen dennoch Fehler auffallen, bitte ich Sie mir diese zu melden. Ich werde stets versuchen, die Fehler umgehend zu beseitigen. Falls das nicht möglich ist würde die 
            Webseite temporär auch offline genommen werden.
          </div>
              
          <h1>Impressum</h1>

          <h2>Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
          <p>
            Ansprechpartner: Adrian Weiss<br />
          </p>

          <h2>Kontakt</h2>
          <p>
            Adrian Weiss<br />
          E-Mail: <a href="mailto:service@playfields.de">service@playfields.de</a><br />
          Internetaddresse: <a href="playfields.de" target="_blank">playfields.de</a><br />
          </p>
          {/* 
          <h2>Redaktionell Verantwortlicher</h2>
          <p>
            Adrian Weiss
          </p>
          */}
          <h2>Haftungsausschluss (Disclaimer)</h2>
          <h3>Haftung f&uuml;r Inhalte</h3>
          <p>Als Diensteanbieter sind wir gem&auml;&szlig; &sect; 7 Abs.1 TMG f&uuml;r eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
          Nach &sect;&sect; 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, &uuml;bermittelte oder gespeicherte fremde Informationen zu &uuml;berwachen
          oder nach Umst&auml;nden zu forschen, die auf eine rechtswidrige T&auml;tigkeit hinweisen.
          </p>
          <p>Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unber&uuml;hrt. Eine diesbez&uuml;gliche
          Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung m&ouml;glich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden
          wir diese Inhalte umgehend entfernen.
          </p>

          <h3>Haftung f&uuml;r Links</h3>
          <p>Unser Angebot enth&auml;lt Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb k&ouml;nnen wir f&uuml;r diese fremden Inhalte auch
          keine Gew&auml;hr &uuml;bernehmen. F&uuml;r die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten
          Seiten wurden zum Zeitpunkt der Verlinkung auf m&ouml;gliche Rechtsverst&ouml;&szlig;e &uuml;berpr&uuml;ft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
          </p>
          <p>Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen
          werden wir derartige Links umgehend entfernen.
          </p>

          <h3>Urheberrecht</h3>
          <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielf&auml;ltigung, Bearbeitung, Verbreitung und jede
          Art der Verwertung au&szlig;erhalb der Grenzen des Urheberrechtes bed&uuml;rfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite
          sind nur f&uuml;r den privaten, nicht kommerziellen Gebrauch gestattet.
          </p>
          <p>Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet.
          Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige
          Inhalte umgehend entfernen.
          </p>

          <p>Quelle: <a href="https://www.e-recht24.de">eRecht24</a></p>
        </div>
      </div>
    </div>
  )
}

export default Impressum
