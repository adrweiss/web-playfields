import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
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
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

function Impressum() {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Off</Grid>
          <Grid item>
            <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
          </Grid>
          <Grid item>On</Grid>
        </Grid>
      </Typography>
      <h1>Legal Disclosure</h1>
      Information in accordance with Section 5 TMG <br /><br />
      Straße<br />
      2839 Ort<br />

      <h2>Contact Information</h2>
      Telephone: 921<br />
      E-Mail: <a href="mailto:mail@test.de">mail@test.de</a><br />
      Internet address: <a href="sklfdlk.de" target="_blank">sklfdlk.de</a><br />
      <h2>Graphics and Image Sources</h2>
      Bildquellen<br /><br />
      <h2>Disclaimer</h2>

      Accountability for content<br />
      The contents of our pages have been created with the utmost care. However, we cannot guarantee the contents'
      accuracy, completeness or topicality. According to statutory provisions, we are furthermore responsible for
      our own content on these web pages. In this matter, please note that we are not obliged to monitor
      the transmitted or saved information of third parties, or investigate circumstances pointing to illegal activity.
      Our obligations to remove or block the use of information under generally applicable laws remain unaffected by this as per
      §§ 8 to 10 of the Telemedia Act (TMG).<br /><br />

      Accountability for links<br />
      Responsibility for the content of external links (to web pages of third parties) lies solely with the operators of the linked pages. No violations were
      evident to us at the time of linking. Should any legal infringement become known to us, we will remove the respective
      link immediately.<br /><br />

      Copyright<br />
      Our web pages and their contents are subject to German copyright law. Unless expressly permitted by law, every form of utilizing, reproducing or processing
      works subject to copyright protection on our web pages requires the prior consent of the respective owner of the rights. Individual reproductions of a work
      are only allowed for private use. The materials from these pages are copyrighted and any unauthorized use may violate copyright laws.<br /><br />

      <i>Quelle: </i><a href="http://www.translate-24h.de" >translate-24h Übersetzungen</a> <br /><br />

      <h1>Impressum</h1>

      <h2>Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
      <p>Max Mustermann<br/>
        Musterstra&szlig;e 111<br/>
        Geb&auml;ude 44<br/>
        90210 Musterstadt</p>

      <h2>Kontakt</h2>
      <p>Telefon: +49 (0) 123 44 55 66<br/>
        Telefax: +49 (0) 123 44 55 99<br/>
        E-Mail: mustermann@musterfirma.de
      </p>

      <h2>Redaktionell Verantwortlicher</h2>
      <p>Beate Beispielhaft<br/>
        Musterstra&szlig;e 110<br/>
        90210 Musterstadt</p>

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
  )
}

export default Impressum
