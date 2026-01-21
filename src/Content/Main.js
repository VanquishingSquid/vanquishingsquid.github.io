import styles from '../Styles/Main.module.css';

import { useState, useEffect, useRef } from 'react';

function Tp({setCurrentPage}) {
  const divs = [
    (<div>
      <h1>tomo pi kasi [sona.len.n] </h1>
    </div>),
    (<div>
      <h2>lipu ni li lon(toki&pona taso) tan(seme)</h2>
      <p>
        nanpa wan la toki&pona li pona&mute tawa(mi)<br/>
        nanpa tu la<br/>
        zz tenpo&pini la<br/>
        zz zz mi lukin e ma te<span style={{fontVariantLigatures: "none"}}>Discord</span>to<br/>
        zz zz zz e ma te<span style={{fontVariantLigatures: "none"}}>Youtube</span>to<br/>
        zz zz zz e ma ante<br/>
        zz zz taso la mi pana ala e sitelen mi<br/>
        zz jan&poka mi li toki&pona ala<br/>
        zz tan(ni) la mi toki lon(ilo sona)<br/>
        zz zz tawa(jan pi ilo sona)<br/>
        zz zz lon(toki&pona)<br/>
        zz jan&ante li jo e ma ona<br/>
        zz taso la tenpo&pini la mi jo ala e ma mi<br/>
        zz mi wile pali e tomo mi lon(ilo sona)<br/>
        zz ni li ona a<br/>
        zz nasin ni^ la<br/>
        zz zz toki&pona li pona tawa(mi) la mi pali e lipu&ni<br/>
        zz tan(ni) la<br/>
        zz zz lipu&ni li lon toki [ijo n lili ijo] anu toki&ante la<br/>
        zz zz zz lipu&ni li nasa tawa(mi)<br/>
      </p>
    </div>),
    (<div>
      <h2>seme li pona tawa(mi)</h2>
      <p>
        suno li pona a<br/>
        seli li pona a<br/>
        suno seli li lon la<br/>
        zz mi mama e kasi<br/>
        kasi nanpa wan mi<br/>
        zz li kasi suno<br/>
        zz li kili palisa jelo loje<br/>
        kili ni^ li suwi a<br/>
        kin la<br/>
        zz mi kute mute e kalama musi<br/>
        zz zz kama la mi wile(pali) e kalama mi<br/>
        zz mi pali lon(ilo sona)<br/>
        zz mi kama sona e toki ante
      </p>
    </div>),
    (<div>
      <h2>mi sona e toki seme</h2>
      <p>
        mi toki [pona . suwi . kalama .]<br/>
        mi toki [e pana . n jaki .] lili<br/>
        mi kama sona e toki [kalama . mu . li .]<br/>
        mi wile toki [a ma . li . n jaki .]<br/>
        zz ni^ li toki lon(ma [ilo telo . jo . pi . jaki .])<br/>
        o toki tawa(mi)<br/>
        zz kepeken nasin toki ale ni^<br/>
        zz lon(ma pona pi toki&pona)<br/>
        zz lon(ma mun)<br/>
        zz lon(musi) [ma . n kalama .]
      </p>
    </div>),
    (<div>
      <h2>sina kute e kalama musi mi anu seme</h2>
      <p>
        kalama musi<br/>
        zz li kalama mute a<br/>
        zz li pana e pilin wawa mute la<br/>
        zz zz ona li pona tawa(mi)<br/>
        lon poka ante la<br/>
        zz mi kute kin e kalama musi ni<br/>
        zz zz ona li kepeken tenpo mute<br/>
        zz zz zz li pana e pilin lape<br/>
        zz zz kalama lili li lon(ona)<br/>
        jan&pona lon(ma mi) li kute ala e kalama musi mi<br/>
        taso la toki pi(kalama musi) li pona mute tawa mi<br/>
        sina kute e kalama musi sama<br/>
        anu sina wile toki tan(kalama musi ante) tawa(mi) la<br/>
        zz o toki tawa mi<br/>
        zz mi wile kute e sina a<br/>
        nimi mi li te<span style={{fontVariantLigatures: "none"}}>VanquishingSquid</span>to<br/>
        zz lon ma te<span style={{fontVariantLigatures: "none"}}>Discord</span>to
      </p>
    </div>)
  ]

  const images = [
    ["pipi pi(telo jelo suwi)", "img/pipi.png"],
    ["kasi suno", "img/kasi-suno.png"],
    ["palisa ma", "img/palisa-ma.png"],
    ["pipi akesi", "img/pipipikiwenkasi.png"],
    ["soko pimeja", "img/sokopimeja.png"],
    ["pipi suno", "img/pipisuno.png"],
    ["sowelipi(palisaikemute)", "img/sowelipipalisaikemute.png"]
  ]

  const rotateSpeed = 0.3;
  const growSpeed   = 0.05;

  const [divState, setDivState] = useState(Array.from({length: divs.length}, () => 
    ({a: Math.random()*360, s: 0.5})
  ));

  const spindivstyles = divState.map((o,i) => ({
    transform: `rotateY(${o.a}deg) scale(${o.s})`
  }));

  const [hoveredDiv, setHoveredDiv] = useState(null);
  const animationRef = useRef(null);
  
  useEffect(() => {
    function spinDivs() {
      setDivState(prev => prev.map((o,i) => {
        // if rotating, keep rotating at a constant speed
        if (i!=hoveredDiv) {
          return {a:(o.a+rotateSpeed)%360, s:Math.max(0.5, o.s-growSpeed)};
        }
        
        // if hovered but still rotating
        // rotate faster until flat then stop
        else {
          const mul = 15;
          var newSpeed = Math.min(1,o.s+growSpeed)
          if (o.a < rotateSpeed*mul || 360-o.a < rotateSpeed*mul) {
            return {a:0, s:newSpeed};
          }
          else {
            return {a:o.a+=(rotateSpeed*mul)%360, s:Math.min(1, newSpeed)};
          }
        }
      }));
    }

    // create a function which
    //  updates the objects' rotation
    //  calls itself before the next animation frame
    const animate = () => {
      spinDivs();
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // call that function for the first time
    animationRef.current = requestAnimationFrame(animate);

    // the function being returned here will handle animate()'s
    // destruction at the end of the program
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [hoveredDiv]);
   
  const divsdone = divs.map((item,i) => (
    <div
      className={styles.tawasike}
      style={spindivstyles[i]}
      key={i}
      onMouseEnter={()=>setHoveredDiv(i)}
      onMouseLeave={()=>setHoveredDiv(null)}
    >
      {item}
    </div>
  ))

  const copyText = async () => {
    const htmlToCopy = `<a href='vanquishingsquid.github.io'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAAAfCAYAAABjyArgAAAACXBIWXMAAC4jAAAuIwF4pT92AAABk0lEQVRoQ+2aO07DQBCGHR5JjRAHoKCmzA1oKTkALXehoOII3IBHRwcdgi4ISIEQUnAUU2AbIdAsmtV67ZU3MCMxZj7JsuNY+2s//do4iXsH27eficLGAtvISrJ/spssoYebu0tVQsjZ6NCMpg1m4Hp8YUe1DUbS12eGyP/DY/pQmaw2mBkVzIwKZoZV8NbVqtk4+esZtQ+5NnbuNyqXHK2PKq/x/WmW2vMo+XTzpW14Q1cygGjB/qQRPA+i4dgVi8xmmTmcFh9mvzJYbBTdlQyX6CXCb6pPk9y3PDdbf9BPjod5a3u7kuES3WDAFdAkFJsKQoGyKKPEunQlA5lLcEgEMDxfNvvvpja3NbQ0hPAbLTEjeomIoVeEr5pXbghpGT9usI8/cSqhLhIzSBus1CEV/J6V7I6lZZAKVhgbLK1ZIajnQdrgydOEvcTSMkgFK4xLhLRmhaCeB9l98Hhvzf6Yw4XEDF0imCFrMMDx7c1HWoY2mJlag/2/nZXfUWmw+8CEQoNtMD7qo9BiGgwPqSk8fAHcwQLBp3YEOQAAAABJRU5ErkJggg=='/></a>`
    try {
      await navigator.clipboard.writeText(htmlToCopy);
      alert('mi pana e toki ilo pi lipu mi tawa ilo sina. sina ken ctrl+v');
    } catch (err) {
      console.error('nena ni li pakala\nike a');
    }
  };

  return (
    <div className={styles.ale}>
      {/* poki pi tawa sike */}
      <div style={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
      }}>
        <div style={{
          display:'flex',
          flexDirection:'row'
        }}>
          {/* poka wan */}
          <div style={{
            display:'flex',
            flexDirection:'column'
          }}>
            {divsdone[0]}
            {divsdone[1]}
          </div>

          {/* poka tu */}
          <div style={{
            display:'flex',
            flexDirection:'column'
          }}>
            {divsdone[2]}
            {divsdone[3]}
          </div>
        {divsdone[4]}
        </div>
      </div>


      {/* jan pona li tawa poka */}
      <div className={styles.pokipijanponaale}>
        {/* nimi lawa */}
        <div className={styles.pokipinimisulipijanpona}>
          <div className={styles.linjasikelawa}></div>
          <div className={styles.nimisulipijanpona}><h1 style={{margin:'0'}}>jan&pona mi</h1></div>
          <div className={styles.linjasikeanpa}></div>
        </div>

        {/* poki */}
        <div className={styles.janponaale}>

          {/* tawa pi jan pona */}
          <div className={styles.janpona}>
            {[1,2].map(_ =>
              images.map(img =>
                <div className={styles.pokipijanpona}>
                  {/* nimi lawa */}
                  <div className={styles.nimilawapijanpona}>
                    {img[0]}
                  </div>

                  {/* sitelen */}
                  <img
                    src={img[1]}
                    className={styles.sitelenpijanpona}
                  />
                </div>
              )
            )}
          </div>
        </div>
        <div className={styles.tawaalasike} style={{
          display:'flex',
          alignItems:'center',
          gap:'20px',
          padding:'20px',
          background: 'linear-gradient(45deg, #205f1a, #1d534a)',
          boxShadow: '5px 5px 25px rgb(0,0,0,1)',
          margin:'10px',
          borderRadius:'5px'
        }}>
          <div>
            sina wile pana e nena tawa(lipu&mi)<br/>zz lon(lipu&sina) la<br/>zz zz o kepeken e nena ni&gt;
          </div>
          <div>
            <img onClick={copyText} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAAAfCAYAAABjyArgAAAACXBIWXMAAC4jAAAuIwF4pT92AAABk0lEQVRoQ+2aO07DQBCGHR5JjRAHoKCmzA1oKTkALXehoOII3IBHRwcdgi4ISIEQUnAUU2AbIdAsmtV67ZU3MCMxZj7JsuNY+2s//do4iXsH27eficLGAtvISrJ/spssoYebu0tVQsjZ6NCMpg1m4Hp8YUe1DUbS12eGyP/DY/pQmaw2mBkVzIwKZoZV8NbVqtk4+esZtQ+5NnbuNyqXHK2PKq/x/WmW2vMo+XTzpW14Q1cygGjB/qQRPA+i4dgVi8xmmTmcFh9mvzJYbBTdlQyX6CXCb6pPk9y3PDdbf9BPjod5a3u7kuES3WDAFdAkFJsKQoGyKKPEunQlA5lLcEgEMDxfNvvvpja3NbQ0hPAbLTEjeomIoVeEr5pXbghpGT9usI8/cSqhLhIzSBus1CEV/J6V7I6lZZAKVhgbLK1ZIajnQdrgydOEvcTSMkgFK4xLhLRmhaCeB9l98Hhvzf6Yw4XEDF0imCFrMMDx7c1HWoY2mJlag/2/nZXfUWmw+8CEQoNtMD7qo9BiGgwPqSk8fAHcwQLBp3YEOQAAAABJRU5ErkJggg=='/>
          </div>
        </div>
        <div style={{display:'flex', flexDirection:'horizontal', gap:'20px'}}>
          <a href="https://areon546.co.uk/"><img src="data:image/png;base64,R0lGODdhWAAfAOYAAAQCBMyOLERWBDwWBIRSBCweBCQSBKRqDAwSBMT+BOy2LKReBEQuBGRKFIReJNSSHBQGBCQuBGQ2BGxSJAQKBIRWLKx6FBwOBNyeJJRWBDQmDDQaBHRCBJRiFOSmFAwCBLyWJDwiBIxaFDQeBCwaBJxyRFQuBGw+BOSeHHxKBExmBIxSBCwWBKxyFBQWDPzCPCw2BFw+DHxeLBwWDNyiJHRGBJRiLMyaJEwqBDQiBAQGBERaBIRWBCQWBKRqFBQOBJxmHDwuHIxeLBQKBCQyBGQ6BHxWLAwKBLR+JBwSBJRmHAwGBEQmBDQeDFQ2DPzGRNyiLHRGDMyaNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAWAAfAAAH/oAAgoOEhYaHiImKi4yNjo+QkZKTlIURCZiZAJeDnJeZmJWiopdEpqabCZ2qpadEo4SfoKmzspq2obipOpaqgp4JvLCGOq4CrAmmO8inx6nNzETLtLWguda+w7jIvAgq1LfBv9ypADoR6BHO5+nOpejOw8/wyL1E6RHl4/qcvYbAq+SlgqGsXqwEBE89M+XOF6di0P5Fk5YN1jZ9q6yBu7bvoj+PAkOKRLSk5JIhKIccMbnE3MiXi3SYRJlkA4kkKFnC3Hlo5g8DRVr44DBiyJIjwngqFXQEwEkDHBq4+CGjQwGjH5Iu3dkSwg8TMQhNINBjidatL3V8eFrDEBIGv0OcolWqY8gIJ4bGXnA5N63TCxI0GCoAIknLs30FfvghommhD1BICGqZWKTMIUB6YiBhtvLIkhc6xC20ZDNiz8OGXCAQxNCGGyRkohY5BKgDQ0YsXKA8W57MC0wCkJZywqja3vI+1D5we1CFByGWrD2NPBKvI0Nw0CgxYIANBRx2m6w+6gMACLVToHjxwsMKEsZ5k6ck8+QPFjhWLJAAX+d8USup1gMLI+TAwgUrjfdfJUtA8FQPJNxklH8LzhUIADs=" height="31" alt="button to epiku.net"/></a>
          <a href="https://epiku.net/"><img src="https://epiku.net/sitelen/88x31.gif" height="31" alt="button to epiku.net"/></a>
        </div>
        <iframe src="https://john.citrons.xyz/embed?ref=filipkarman3.github.io" className={styles.john}></iframe>
      </div>
    </div>
  );
}

export default Tp;
