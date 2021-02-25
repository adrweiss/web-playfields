import React, { useState } from 'react'
import './DataPrivacy.css'

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

function DataPrivacy() {
  const [state, setState] = useState(true)

  const handleChange = (event) => {
    setState(!state);
  };

  return (
    <div>
      <div className="data__privacy__base__container">
        <div className="data__privacy__base__language">
          <Typography component="div">
            <Grid component="label" container alignItems="center" spacing={1}>
              <div className="data__privacy__language__slider">
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
           <h2>Privacy Policy</h2> 
           <p>Personal data (usually referred to just as "data" below) will only be processed by us to the extent necessary and for the 
             purpose of providing a functional and user-friendly website, including its contents, and the services offered there.</p> 
            <p>Per Art. 4 No. 1 of Regulation (EU) 2016/679, i.e. the General Data Protection Regulation (hereinafter referred to 
              as the "GDPR"), "processing" refers to any operation or set of operations such as collection, recording, organization, 
              structuring, storage, adaptation, alteration, retrieval, consultation, use, disclosure by transmission, 
              dissemination, or otherwise making available, alignment, or combination, restriction, erasure, or destruction 
              performed on personal data, whether by automated means or not.</p> 
            <p>The following privacy policy is intended to inform you in particular about the type, scope, purpose, duration, 
              and legal basis for the processing of such data either under our own control or in conjunction with others. 
              We also inform you below about the third-party components we use to optimize our website and improve the user 
              experience which may result in said third parties also processing data they collect and control.</p> 
            <p>Our privacy policy is structured as follows:</p> 
            <p>I. Information about us as controllers of your data<br/>
              II. The rights of users and data subjects<br/>
              III. Information about the data processing</p> 
            <h3>I. Information about us as controllers of your data</h3> 
            <p>The party responsible for this website (the "controller") for purposes of data protection law is:</p> 
            <p><span >Adrian Weiss</span><br/>
              {/* 
              <span >Any street 1</span><br/>
              <span >12345 Anytown</span><br/>
              */}
              <span >Germany</span></p> 
            <p>{/*
              <span >Telephone: Telephone number</span><br/>
              <span >Fax: Fax number</span><br/>
              */}
              <span >E-Mail: <a href="mailto:playfield.dev@gmail.com">playfield.dev@gmail.com</a><br/></span></p> 
              {/*
            <p>The controller's data protection officer is:</p> 
            <p><span >Maxie Musterfrau&nbsp;</span></p> 
            <p><span >[The following information must be added if an external data protection officer 
              has been appointed].</span></p> 
            <p><span >Any street 1</span><br/>
              <span >12345 Anytown</span><br/>
              <span >Germany</span></p> 
            <p><span >Telephone: Telephone number</span><br/>
              <span >Fax: Fax number</span><br/>
              <span >Email: datenschutz@mustermail.xy</span></p> 
              */}
            <h3>II. The rights of users and data subjects</h3> 
            <p>With regard to the data processing to be described in more detail below, users and data subjects have the right</p> 
            <ul type="disc"> 
              <li>to confirmation of whether data concerning them is being processed, information about the data being processed, 
                further information about the nature of the data processing, and copies of the data (cf. also Art. 15 GDPR);</li> 
              <li>to correct or complete incorrect or incomplete data (cf. also Art. 16 GDPR);</li> 
              <li>to the immediate deletion of data concerning them (cf. also Art. 17 DSGVO), or, alternatively, if further 
                processing is necessary as stipulated in Art. 17 Para. 3 GDPR, to restrict said processing per Art. 18 GDPR;</li> 
              <li>to receive copies of the data concerning them and/or provided by them and to have the same transmitted to 
                other providers/controllers (cf. also Art. 20 GDPR);</li> 
              <li>to file complaints with the supervisory authority if they believe that data concerning them is being processed by 
                the controller in breach of data protection provisions (see also Art. 77 GDPR).</li> 
            </ul> 
            <p>In addition, the controller is obliged to inform all recipients to whom it discloses data of any such corrections, 
              deletions, or restrictions placed on processing the same per Art. 16, 17 Para. 1, 18 GDPR. However, this obligation 
              does not apply if such notification is impossible or involves a disproportionate effort. Nevertheless, users have a 
              right to information about these recipients.</p> 
            <p><strong>Likewise, under Art. 21 GDPR, users and data subjects have the right to object to the controller's 
              future processing of their data pursuant to Art. 6 Para. 1 lit. f) GDPR. In particular, an objection to data 
              processing for the purpose of direct advertising is permissible.</strong></p> 
            <h3>III. Information about the data processing</h3>           
            <p>Your data processed when using our website will be deleted or blocked as soon as the purpose for its storage 
              ceases to apply, provided the deletion of the same is not in breach of any statutory storage obligations or unless 
              otherwise stipulated below.</p>              
            <h4>Server data</h4> 
            <p>For technical reasons, the following data sent by your internet browser to us or to our server provider will be 
              collected, especially to ensure a secure and stable website: These server log files record the type and version of 
              your browser, operating system, the website from which you came (referrer URL), the webpages on our site visited, 
              the date and time of your visit, as well as the IP address from which you visited our site.</p> 
            <p>The data thus collected will be temporarily stored, but not in association with any other of your data.</p> 
            <p>The basis for this storage is Art. 6 Para. 1 lit. f) GDPR. Our legitimate interest lies in the improvement, stability,
              functionality, and security of our website.</p> 
            {/*
            <p>The data will be deleted within no more than seven days, unless continued storage is required for evidentiary purposes. 
              In which case, all or part of the data will be excluded from deletion until the investigation of the relevant incident 
              is finally resolved.</p>  
            */}
            <h4>Customer account/registration</h4> 
            <p>If you create a customer account with us via our website, we will use the data you entered during registration 
              (e.g. your name, your address, or your email address) exclusively for services leading up to your potential placement 
              of an order or entering some other contractual relationship with us, to fulfill such orders or contracts, and to 
              provide customer care (e.g. to provide you with an overview of your previous orders or to be able to offer you a 
              wishlist function). We also store your IP address and the date and time of your registration. This data will not be 
              transferred to third parties.</p> 
            <p>During the registration process, your consent will be obtained for this processing of your data, with reference 
              made to this privacy policy. The data collected by us will be used exclusively to provide your customer account.&nbsp;</p> 
            <p>If you give your consent to this processing, Art. 6 Para. 1 lit. a) GDPR is the legal basis for this processing.</p> 
            <p>If the opening of the customer account is also intended to lead to the initiation of a contractual relationship
              with us or to fulfill an existing contract with us, the legal basis for this processing is also Art. 6 Para. 
              1 lit. b) GDPR.</p> 
            <p>You may revoke your prior consent to the processing of your personal data at any time under Art. 7 Para. 
              3 GDPR with future effect. All you have to do is inform us that you are revoking your consent.</p>
            <p>The data previously collected will then be deleted as soon as processing is no longer necessary. However, 
              we must observe any retention periods required under tax and commercial law.</p>  
            <h4>Contact</h4> 
            <p>If you contact us via email or the contact form, the data you provide will be used for the purpose of processing 
              your request. We must have this data in order to process and answer your inquiry; otherwise we will not be able to 
              answer it in full or at all.</p> 
            <p>The legal basis for this data processing is Art. 6 Para. 1 lit. b) GDPR.</p> 
            <p>Your data will be deleted once we have fully answered your inquiry and there is no further legal obligation to store 
              your data, such as if an order or contract resulted therefrom.</p>  
            <h4>User posts, comments, and ratings</h4> 
            <p>We offer you the opportunity to post questions, answers, opinions, and ratings on our website, hereinafter referred 
              to jointly as "posts." If you make use of this opportunity, we will process and publish your post, the date and time 
              you submitted it, and any pseudonym you may have used.</p> 
            <p>The legal basis for this is Art. 6 Para. 1 lit. a) GDPR. You may revoke your prior consent under Art. 7 Para.
              3 GDPR with future effect. All you have to do is inform us that you are revoking your consent.</p> 
            <p>In addition, we will also process your IP address and email address. The IP address is processed because we might 
              have a legitimate interest in taking or supporting further action if your post infringes the rights of third parties 
              and/or is otherwise unlawful.</p> 
            <p>In this case, the legal basis is Art. 6 Para. 1 lit. f) GDPR. Our legitimate interest lies in any legal defense we 
              may have to mount.</p>  
            <p><a href="https://www.ratgeberrecht.eu/leistungen/muster-datenschutzerklaerung.html" rel="noopener">Model Data Protection Statement</a> for <a href="https://www.ratgeberrecht.eu/" rel="noopener">Anwaltskanzlei Weiß &amp; Partner</a></p> 
        </div>

        <div hidden={state}>
          <h2>Datenschutzerklärung</h2>
          <p>
            Personenbezogene Daten (nachfolgend zumeist nur „Daten“ genannt) werden von uns nur im Rahmen der Erforderlichkeit
            sowie zum Zwecke der Bereitstellung eines funktionsfähigen und nutzerfreundlichen Internetauftritts, inklusive seiner
            Inhalte und der dort angebotenen Leistungen, verarbeitet.</p> <p>Gemäß Art. 4 Ziffer 1. der Verordnung (EU) 2016/679,
          also der Datenschutz-Grundverordnung (nachfolgend nur „DSGVO“ genannt), gilt als „Verarbeitung“ jeder mit oder ohne
          Hilfe automatisierter Verfahren ausgeführter Vorgang oder jede solche Vorgangsreihe im Zusammenhang mit personenbezogenen
          Daten, wie das Erheben, das Erfassen, die Organisation, das Ordnen, die Speicherung, die Anpassung oder Veränderung,
          das Auslesen, das Abfragen, die Verwendung, die Offenlegung durch Übermittlung, Verbr/eitung oder eine andere Form der
          Bereitstellung, den Abgleich oder die Verknüpfung, die Einschränkung, das Löschen oder die Vernichtung.
          </p>
          <p>
            Mit der nachfolgenden Datenschutzerklärung informieren wir Sie insbesondere über Art, Umfang, Zweck, Dauer und Rechtsgrundlage
            der Verarbeitung personenbezogener Daten, soweit wir entweder allein oder gemeinsam mit anderen über die Zwecke und Mittel der
            Verarbeitung entscheiden. Zudem informieren wir Sie nachfolgend über die von uns zu Optimierungszwecken sowie zur Steigerung der
            Nutzungsqualität eingesetzten Fremdkomponenten, soweit hierdurch Dritte Daten in wiederum eigener Verantwortung verarbeiten.
          </p>
          <p>
            Unsere Datenschutzerklärung ist wie folgt gegliedert:
          </p>
          <p>
            I. Informationen über uns als Verantwortliche<br/>
            II. Rechte der Nutzer und Betroffenen<br/>
            III. Informationen zur Datenverarbeitung
          </p>
          <h3>I. Informationen über uns als Verantwortliche</h3>
          <p>
            Verantwortlicher Anbieter dieses Internetauftritts im datenschutzrechtlichen Sinne ist:
          </p>
          <p>
            <span >
              Adrian Weiss<br/>
              {/* 
              Musterstraße 1<br/>
              12345 Musterstadt<br/>
              */}
              Deutschland
            </span>
          </p>
          <p>
            <span >
              {/* 
              Telefon: Telefonnummer<br/>
              Telefax: Faxnummer<br/>
              */}
              E-Mail: <a href="mailto:playfield.dev@gmail.com">playfield.dev@gmail.com</a><br />
            </span>
          </p>
          {/* 
          <p>
            Datenschutzbeauftragte/r beim Anbieter ist:
          </p>
          <p>
            <span >
              Maxie Musterfrau&nbsp;
            </span>
          </p>
          <p>
            <span >
              [nachfolgende Angaben sind zu ergänzen, sofern ein Externer Datenschutzbeauftragter bestellt ist]
            </span>
          </p> 
          <p>
            <span >
              Musterstraße 1<br/>
              12345 Musterstadt<br/>
              Deutschland
            </span>
          </p> 
          <p>
            <span >
              Telefon: Telefonnummer<br/>
              Telefax: Faxnummer<br/>
              E-Mail: datenschutz@mustermail.xy
            </span>
          </p> 
          */}
          <h3>II. Rechte der Nutzer und Betroffenen</h3>
          <p>
            Mit Blick auf die nachfolgend noch näher beschriebene Datenverarbeitung haben die Nutzer und Betroffenen das Recht
          </p>
          <ul> 
            <li>auf Bestätigung, ob sie betreffende Daten verarbeitet werden, auf Auskunft über die verarbeiteten Daten, auf weitere Informationen 
              über die Datenverarbeitung sowie auf Kopien der Daten (vgl. auch Art. 15 DSGVO);</li> 
            <li>auf Berichtigung oder Vervollständigung unrichtiger bzw. unvollständiger Daten (vgl. auch Art. 16 DSGVO);</li> 
            <li>auf unverzügliche Löschung der sie betreffenden Daten (vgl. auch Art. 17 DSGVO), oder, alternativ, soweit eine weitere Verarbeitung 
              gemäß Art. 17 Abs. 3 DSGVO erforderlich ist, auf Einschränkung der Verarbeitung nach Maßgabe von Art. 18 DSGVO;</li>
            <li>auf Erhalt der sie betreffenden und von ihnen bereitgestellten Daten und auf Übermittlung dieser Daten an andere Anbieter/Verantwortliche 
              (vgl. auch Art. 20 DSGVO);</li> 
            <li>auf Beschwerde gegenüber der Aufsichtsbehörde, sofern sie der Ansicht sind, dass die sie betreffenden Daten durch den Anbieter unter Verstoß 
              gegen datenschutzrechtliche Bestimmungen verarbeitet werden (vgl. auch Art. 77 DSGVO).</li> 
          </ul>
          <p>Darüber hinaus ist der Anbieter dazu verpflichtet, alle Empfänger, denen gegenüber Daten durch den Anbieter offengelegt worden sind, über 
            jedwede Berichtigung oder Löschung von Daten oder die Einschränkung der Verarbeitung, die aufgrund der Artikel 16, 17 Abs. 1, 18 DSGVO erfolgt, 
            zu unterrichten. Diese Verpflichtung besteht jedoch nicht, soweit diese Mitteilung unmöglich oder mit einem unverhältnismäßigen Aufwand verbunden ist. 
            Unbeschadet dessen hat der Nutzer ein Recht auf Auskunft über diese Empfänger.</p> 
          <p><strong>Ebenfalls haben die Nutzer und Betroffenen nach Art. 
            21 DSGVO das Recht auf Widerspruch gegen die künftige Verarbeitung der sie betreffenden Daten, sofern die Daten durch den Anbieter nach Maßgabe von Art. 
            6 Abs. 1 lit. f) DSGVO verarbeitet werden. Insbesondere ist ein Widerspruch gegen die Datenverarbeitung zum Zwecke der Direktwerbung statthaft.</strong></p> 
          <h3>III. Informationen zur Datenverarbeitung</h3> 
          <p>Ihre bei Nutzung unseres Internetauftritts verarbeiteten Daten werden gelöscht oder gesperrt, sobald der Zweck der Speicherung entfällt, der Löschung 
            der Daten keine gesetzlichen Aufbewahrungspflichten entgegenstehen und nachfolgend keine anderslautenden Angaben zu einzelnen Verarbeitungsverfahren gemacht werden.</p>  
          <h4>Serverdaten</h4>
          <p>Aus technischen Gründen, insbesondere zur Gewährleistung eines sicheren und stabilen Internetauftritts, werden Daten durch Ihren Internet-br/owser an uns bzw.
            an unseren Webspace-Provider übermittelt. Mit diesen sog. Server-Logfiles werden u.a. Typ und Version Ihres Internetbr/owsers, das Betriebssystem, die Website, 
            von der aus Sie auf unseren Internetauftritt gewechselt haben (Referrer URL), die Website(s) unseres Internetauftritts, die Sie besuchen, Datum und Uhrzeit des 
            jeweiligen Zugriffs sowie die IP-Adresse des Internetanschlusses, von dem aus die Nutzung unseres Internetauftritts erfolgt, erhoben.</p> 
          <p>Diese so erhobenen Daten werden vorrübergehend gespeichert, dies jedoch nicht gemeinsam mit anderen Daten von Ihnen.</p> 
          <p>Diese Speicherung erfolgt auf der Rechtsgrundlage von Art. 6 Abs. 1 lit. f) DSGVO. Unser berechtigtes Interesse liegt in der Verbesserung, Stabilität, Funktionalität 
            und Sicherheit unseres Internetauftritts.</p> 
          {/* 
          <p>Die Daten werden spätestens nach sieben Tage wieder gelöscht, soweit keine weitere Aufbewahrung zu Beweiszwecken erforderlich ist. Andernfalls sind die Daten bis 
            zur endgültigen Klärung eines Vorfalls ganz oder teilweise von der Löschung ausgenommen.</p>  
          */}
          <h4>Kundenkonto / Registrierungsfunktion</h4> 
          <p>Falls Sie über unseren Internetauftritt ein Kundenkonto bei uns anlegen, werden wir die von Ihnen bei der Registrierung eingegebenen Daten (also bspw. Ihren Namen, 
            Ihre Anschrift oder Ihre E-Mail-Adresse) ausschließlich für vorvertragliche Leistungen, für die Vertragserfüllung oder zum Zwecke der Kundenpflege (bspw. um Ihnen eine 
            Übersicht über Ihre bisherigen Bestellungen bei uns zur Verfügung zu stellen oder um Ihnen die sog. Merkzettelfunktion anbieten zu können) erheben und speichern. 
            Gleichzeitig speichern wir dann die IP-Adresse und das Datum Ihrer Registrierung nebst Uhrzeit. Eine Weitergabe dieser Daten an Dritte erfolgt natürlich nicht.</p> 
          <p>Im Rahmen des weiteren Anmeldevorgangs wird Ihre Einwilligung in diese Verarbeitung eingeholt und auf diese Datenschutzerklärung verwiesen. Die dabei von uns erhobenen 
            Daten werden ausschließlich für die Zurverfügungstellung des Kundenkontos verwendet.&nbsp;</p> 
          <p>Soweit Sie in diese Verarbeitung einwilligen, ist Art. 6 Abs. 1 lit. a) DSGVO Rechtsgrundlage für die Verarbeitung.</p> 
          <p>Sofern die Eröffnung des Kundenkontos zusätzlich auch vorvertraglichen Maßnahmen oder der Vertragserfüllung dient, so ist Rechtsgrundlage für diese Verarbeitung auch noch 
            Art. 6 Abs. 1 lit. b) DSGVO.</p> 
          <p>Die uns erteilte Einwilligung in die Eröffnung und den Unterhalt des Kundenkontos können Sie gemäß Art. 7 Abs. 3 DSGVO jederzeit mit Wirkung für die Zukunft widerrufen. 
            Hierzu müssen Sie uns lediglich über Ihren Widerruf in Kenntnis setzen.</p> 
          <p>Die insoweit erhobenen Daten werden gelöscht, sobald die Verarbeitung nicht mehr erforderlich ist. Hierbei müssen wir aber steuer- und handelsrechtliche Aufbewahrungsfristen beachten.</p>
          <h4>Kontaktanfragen / Kontaktmöglichkeit</h4> 
          <p>Sofern Sie per Kontaktformular oder E-Mail mit uns in Kontakt treten, werden die dabei von Ihnen angegebenen Daten zur Bearbeitung Ihrer Anfrage genutzt. Die Angabe der 
            Daten ist zur Bearbeitung und Beantwortung Ihre Anfrage erforderlich - ohne deren Bereitstellung können wir Ihre Anfrage nicht oder allenfalls eingeschränkt beantworten.</p> 
          <p>Rechtsgrundlage für diese Verarbeitung ist Art. 6 Abs. 1 lit. b) DSGVO.</p> 
          <p>Ihre Daten werden gelöscht, sofern Ihre Anfrage abschließend beantwortet worden ist und der Löschung keine gesetzlichen Aufbewahrungspflichten entgegenstehen, wie bspw. 
            bei einer sich etwaig anschließenden Vertragsabwicklung.</p>  
          <h4>Nutzerbeiträge, Kommentare und Bewertungen</h4> 
          <p>Wir bieten Ihnen an, auf unseren Internetseiten Fragen, Antworten, Meinungen oder Bewertungen, nachfolgend nur „Beiträge genannt, zu veröffentlichen. Sofern Sie dieses 
            Angebot in Anspruch nehmen, verarbeiten und veröffentlichen wir Ihren Beitrag, Datum und Uhrzeit der Einreichung sowie das von Ihnen ggf. genutzte Pseudonym.</p> 
          <p>Rechtsgrundlage hierbei ist Art. 6 Abs. 1 lit. a) DSGVO. Die Einwilligung können Sie gemäß Art. 7 Abs. 3 DSGVO jederzeit mit Wirkung für die Zukunft widerrufen. 
            Hierzu müssen Sie uns lediglich über Ihren Widerruf in Kenntnis setzen.</p> 
          <p>Darüber hinaus verarbeiten wir auch Ihre IP- und E-Mail-Adresse. Die IP-Adresse wird verarbeitet, weil wir ein berechtigtes Interesse daran haben, weitere Schritte 
            einzuleiten oder zu unterstützen, sofern Ihr Beitrag in Rechte Dritter eingreift und/oder er sonst wie rechtswidrig erfolgt.</p> 
          <p>Rechtsgrundlage ist in diesem Fall Art. 6 Abs. 1 lit. f) DSGVO. Unser berechtigtes Interesse liegt in der ggf. notwendigen Rechtsverteidigung.</p>  
          <p><a href="https://www.ratgeberrecht.eu/leistungen/muster-datenschutzerklaerung.html" rel="noopener">Muster-Datenschutzerklärung</a> der <a href="https://www.ratgeberrecht.eu/datenschutz/datenschutzerklaerung-generator-dsgvo.html" rel="noopener">Anwaltskanzlei Weiß &amp; Partner</a></p>
        </div>
      </div>
    </div>
  )
}

export default DataPrivacy
