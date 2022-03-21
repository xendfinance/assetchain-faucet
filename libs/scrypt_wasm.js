

// THIS FILE IS GENERATED AUTOMATICALLY
// Don't edit this file by hand. 
// Edit the build located in the faucet-client/wasm_build folder.

let scrypt;
let scryptPromise;

module.exports = {
  getScrypt: function() { return scrypt; },
  getScryptReadyPromise: function() { return scryptPromise; }
};


var base32768 = (function (exports) {
  'use strict';

  /**
    Base32768 is a binary-to-text encoding optimised for UTF-16-encoded text.
    (e.g. Windows, Java, JavaScript)
  */

  // Z is a number, usually a uint15 but sometimes a uint7

  const BITS_PER_CHAR = 15; // Base32768 is a 15-bit encoding
  const BITS_PER_BYTE = 8;

  // Base32768 uses blocks of 32 characters.
  const blockSize = 1 << 5;
  const repertoires = [
    'ҠԀڀڠݠހ߀ကႠᄀᄠᅀᆀᇠሀሠበዠጠᎠᏀᐠᑀᑠᒀᒠᓀᓠᔀᔠᕀᕠᖀᖠᗀᗠᘀᘠᙀᚠᛀកᠠᡀᣀᦀ᧠ᨠᯀᰀᴀ⇠⋀⍀⍠⎀⎠⏀␀─┠╀╠▀■◀◠☀☠♀♠⚀⚠⛀⛠✀✠❀➀➠⠀⠠⡀⡠⢀⢠⣀⣠⤀⤠⥀⥠⦠⨠⩀⪀⪠⫠⬀⬠⭀ⰀⲀⲠⳀⴀⵀ⺠⻀㇀㐀㐠㑀㑠㒀㒠㓀㓠㔀㔠㕀㕠㖀㖠㗀㗠㘀㘠㙀㙠㚀㚠㛀㛠㜀㜠㝀㝠㞀㞠㟀㟠㠀㠠㡀㡠㢀㢠㣀㣠㤀㤠㥀㥠㦀㦠㧀㧠㨀㨠㩀㩠㪀㪠㫀㫠㬀㬠㭀㭠㮀㮠㯀㯠㰀㰠㱀㱠㲀㲠㳀㳠㴀㴠㵀㵠㶀㶠㷀㷠㸀㸠㹀㹠㺀㺠㻀㻠㼀㼠㽀㽠㾀㾠㿀㿠䀀䀠䁀䁠䂀䂠䃀䃠䄀䄠䅀䅠䆀䆠䇀䇠䈀䈠䉀䉠䊀䊠䋀䋠䌀䌠䍀䍠䎀䎠䏀䏠䐀䐠䑀䑠䒀䒠䓀䓠䔀䔠䕀䕠䖀䖠䗀䗠䘀䘠䙀䙠䚀䚠䛀䛠䜀䜠䝀䝠䞀䞠䟀䟠䠀䠠䡀䡠䢀䢠䣀䣠䤀䤠䥀䥠䦀䦠䧀䧠䨀䨠䩀䩠䪀䪠䫀䫠䬀䬠䭀䭠䮀䮠䯀䯠䰀䰠䱀䱠䲀䲠䳀䳠䴀䴠䵀䵠䶀䷀䷠一丠乀习亀亠什仠伀传佀你侀侠俀俠倀倠偀偠傀傠僀僠儀儠兀兠冀冠净几刀删剀剠劀加勀勠匀匠區占厀厠叀叠吀吠呀呠咀咠哀哠唀唠啀啠喀喠嗀嗠嘀嘠噀噠嚀嚠囀因圀圠址坠垀垠埀埠堀堠塀塠墀墠壀壠夀夠奀奠妀妠姀姠娀娠婀婠媀媠嫀嫠嬀嬠孀孠宀宠寀寠尀尠局屠岀岠峀峠崀崠嵀嵠嶀嶠巀巠帀帠幀幠庀庠廀廠开张彀彠往徠忀忠怀怠恀恠悀悠惀惠愀愠慀慠憀憠懀懠戀戠所扠技抠拀拠挀挠捀捠掀掠揀揠搀搠摀摠撀撠擀擠攀攠敀敠斀斠旀无昀映晀晠暀暠曀曠最朠杀杠枀枠柀柠栀栠桀桠梀梠检棠椀椠楀楠榀榠槀槠樀樠橀橠檀檠櫀櫠欀欠歀歠殀殠毀毠氀氠汀池沀沠泀泠洀洠浀浠涀涠淀淠渀渠湀湠満溠滀滠漀漠潀潠澀澠激濠瀀瀠灀灠炀炠烀烠焀焠煀煠熀熠燀燠爀爠牀牠犀犠狀狠猀猠獀獠玀玠珀珠琀琠瑀瑠璀璠瓀瓠甀甠畀畠疀疠痀痠瘀瘠癀癠皀皠盀盠眀眠着睠瞀瞠矀矠砀砠础硠碀碠磀磠礀礠祀祠禀禠秀秠稀稠穀穠窀窠竀章笀笠筀筠简箠節篠簀簠籀籠粀粠糀糠紀素絀絠綀綠緀締縀縠繀繠纀纠绀绠缀缠罀罠羀羠翀翠耀耠聀聠肀肠胀胠脀脠腀腠膀膠臀臠舀舠艀艠芀芠苀苠茀茠荀荠莀莠菀菠萀萠葀葠蒀蒠蓀蓠蔀蔠蕀蕠薀薠藀藠蘀蘠虀虠蚀蚠蛀蛠蜀蜠蝀蝠螀螠蟀蟠蠀蠠血衠袀袠裀裠褀褠襀襠覀覠觀觠言訠詀詠誀誠諀諠謀謠譀譠讀讠诀诠谀谠豀豠貀負賀賠贀贠赀赠趀趠跀跠踀踠蹀蹠躀躠軀軠輀輠轀轠辀辠迀迠退造遀遠邀邠郀郠鄀鄠酀酠醀醠釀釠鈀鈠鉀鉠銀銠鋀鋠錀錠鍀鍠鎀鎠鏀鏠鐀鐠鑀鑠钀钠铀铠销锠镀镠門閠闀闠阀阠陀陠隀隠雀雠需霠靀靠鞀鞠韀韠頀頠顀顠颀颠飀飠餀餠饀饠馀馠駀駠騀騠驀驠骀骠髀髠鬀鬠魀魠鮀鮠鯀鯠鰀鰠鱀鱠鲀鲠鳀鳠鴀鴠鵀鵠鶀鶠鷀鷠鸀鸠鹀鹠麀麠黀黠鼀鼠齀齠龀龠ꀀꀠꁀꁠꂀꂠꃀꃠꄀꄠꅀꅠꆀꆠꇀꇠꈀꈠꉀꉠꊀꊠꋀꋠꌀꌠꍀꍠꎀꎠꏀꏠꐀꐠꑀꑠ꒠ꔀꔠꕀꕠꖀꖠꗀꗠꙀꚠꛀ꜀꜠ꝀꞀꡀ', // length = 1 << 10
    'ƀɀɠʀ' // length = 1 << 2
  ];

  const lookupE = {};
  repertoires.forEach((repertoire, r) => {
    const numZBits = BITS_PER_CHAR - BITS_PER_BYTE * r; // 0 -> 15, 1 -> 7
    const encodeRepertoire = [];
    for (let i = 0; i < repertoire.length; i++) {
      const charCode = repertoire.charCodeAt(i);
      for (let offset = 0; offset < blockSize; offset++) {
        encodeRepertoire.push(String.fromCharCode(charCode + offset));
      }
    }
    lookupE[numZBits] = encodeRepertoire;
  });

  const lookupD = {};
  Object.entries(lookupE).forEach(([numZBits, encodeRepertoire]) => {
    encodeRepertoire.forEach((chr, z) => {
      lookupD[chr] = [Number(numZBits), z];
    });
  });

  const encode = uint8Array => {
    const length = uint8Array.length;

    let str = '';
    let z = 0;
    let numZBits = 0;

    for (let i = 0; i < length; i++) {
      const uint8 = uint8Array[i];

      // Take most significant bit first
      for (let j = BITS_PER_BYTE - 1; j >= 0; j--) {
        const bit = (uint8 >> j) & 1;

        z = (z << 1) + bit;
        numZBits++;

        if (numZBits === BITS_PER_CHAR) {
          str += lookupE[numZBits][z];
          z = 0;
          numZBits = 0;
        }
      }
    }

    if (numZBits !== 0) {
      // Final bits require special treatment.

      // z = bbbbbbcccccccc, numZBits = 14, padBits = 1
      // z = bbbbbcccccccc, numZBits = 13, padBits = 2
      // z = bbbbcccccccc, numZBits = 12, padBits = 3
      // z = bbbcccccccc, numZBits = 11, padBits = 4
      // z = bbcccccccc, numZBits = 10, padBits = 5
      // z = bcccccccc, numZBits = 9, padBits = 6
      // z = cccccccc, numZBits = 8, padBits = 7
      // => Pad `z` out to 15 bits using 1s, then encode as normal (r = 0)

      // z = ccccccc, numZBits = 7, padBits = 0
      // z = cccccc, numZBits = 6, padBits = 1
      // z = ccccc, numZBits = 5, padBits = 2
      // z = cccc, numZBits = 4, padBits = 3
      // z = ccc, numZBits = 3, padBits = 4
      // z = cc, numZBits = 2, padBits = 5
      // z = c, numZBits = 1, padBits = 6
      // => Pad `z` out to 7 bits using 1s, then encode specially (r = 1)

      while (!(numZBits in lookupE)) {
        z = (z << 1) + 1;
        numZBits++;
      }

      str += lookupE[numZBits][z];
    }

    return str
  };

  const decode = str => {
    const length = str.length;

    // This length is a guess. There's a chance we allocate one more byte here
    // than we actually need. But we can count and slice it off later
    const uint8Array = new Uint8Array(Math.floor(length * BITS_PER_CHAR / BITS_PER_BYTE));
    let numUint8s = 0;
    let uint8 = 0;
    let numUint8Bits = 0;

    for (let i = 0; i < length; i++) {
      const chr = str.charAt(i);

      if (!(chr in lookupD)) {
        throw new Error(`Unrecognised Base32768 character: ${chr}`)
      }

      const [numZBits, z] = lookupD[chr];

      if (numZBits !== BITS_PER_CHAR && i !== length - 1) {
        throw new Error('Secondary character found before end of input at position ' + String(i))
      }

      // Take most significant bit first
      for (let j = numZBits - 1; j >= 0; j--) {
        const bit = (z >> j) & 1;

        uint8 = (uint8 << 1) + bit;
        numUint8Bits++;

        if (numUint8Bits === BITS_PER_BYTE) {
          uint8Array[numUint8s] = uint8;
          numUint8s++;
          uint8 = 0;
          numUint8Bits = 0;
        }
      }
    }

    // Final padding bits! Requires special consideration!
    // Remember how we always pad with 1s?
    // Note: there could be 0 such bits, check still works though
    if (uint8 !== ((1 << numUint8Bits) - 1)) {
      throw new Error('Padding mismatch')
    }

    return new Uint8Array(uint8Array.buffer, 0, numUint8s)
  };

  exports.decode = decode;
  exports.encode = encode;

  return exports;

}({}));


const base32768WASM = "Ԑ茻䙠Ҡҫ犥晤ꜟԐݿ陀㸶ҫꊥꗀᓿ星晸گ鹗鹫ꐠᑾڠዿ蘿陀ᯀ䨻꒽ꔂ꜀ޟ暿牠Ҧԋ꒽ꗾꙀ噣䘟陏鹗鹣ҽꗾꜟ星蘠⪡㸷ꊛ꒽ꗾꜟԐҠ噌ڗꊛ꒽ꔂ꜀ᄟ䘀噀崶虠▸⪸⤆ᏀႠခ睐▸Ҡቢᯅ▧ҡ䙁䙰㹘㹀ᯀᯃᆁ暠䛠噠㹘⪬ቦҧᆀҡ䛀䙐予ҠҪᛄᏂ暠虠Ԁ㙀ᖜҨቡҡݠ䚀䙀㚈ᖄᖄቢႠڀ䚀䛀暠㩀▪ᅐݭ⋁䚠㙁◐䩅ꔂ柠曀Ң蝎ڠ始㯵蕄齢ң䌘钯㵇䙀囝攞鷂嬗㽙錍豖⤣㞽輾藓悐缺鉎⎖燓矵詠荱嘏萸玍貦憋忝脢鋌帑普䢋鱗慳䯹漮诎嘙㾘叭浖㹂◝攞鷂嬗㽙錍豖姳㯔ݼ⚿ݠ㚀䞣㧦禛伩㜖邯⚸䂑ᓄᓕ㡛䟝弖篊嫥各䚍熓癪䀼晠䙁㩁㑈暤Ҳ晱雨⋂㾷㙁皠键塠䁈怽贴䙁㩁⚨槄Ҳ晰ݨ䂀ᄈႢ☢溃㶲ڒᖍ鍆䙊䛇䐜鎭䡀㡈搼晤杭戙湠溁䷇䆑▰晢乢㑑ᙈԅԂႰ睤奎䙔䛁菼詢橰騛琉窠ᄈႪ☥詠㣀㜁♩ዲ鶀㽠朽瓄ᒤ☓萭窠Ꭺ㙀灠汤䠂ҩ䙈㺄⤠ݴݤᗃᖑ爙ڡቦ鳓㙌㚃畎崆睠ᘠᗐ䡯㙀灠杤䜄♫苠㻂ᓶ忰ᒐ䠎鶒ړ倈晦杯懰ߐ䟮鶒Һᖩ鍆邂ᐠ樽詠穰鈛狠⢂⡶怕☡躁鷒Ԛᖵ镆䙇䛅䏜鎤䚤☛苠⭂⺷忰ᆐ䞎趖睰䯨晢乢䁑Ⲑ䥮顣䁈㐙負妡⏛茨ᔍ䡀妱Ҥ癤劂㹠沽試ᖐ䇳狠蛢㒷忰⩚橠鴂ߚᖍ銠䆁Ⱋ茨ᓨ㜧懹ڑ窠ᡊ㙉皠锤ᄔ♫萬暆杮戙湬玤Ԗ睠荤⎌䙗䛌萼詢驰騛狠圴䙳孰ᑐ䚮衠聨谽負⥁⏛茨ᆍ䡃ᓑұቾ鶀ዠ榽铄ڄ◳耭窤◡╛湢◁緗㽀䝄㬬駊㝇㚃镄င☋萬晼杪憙胨桨㜷彠杤䄮馀◀棽瓍䡡⠈搼暂杭戙湤亁䷇䆑◩ቾ鶀⛀榽铄ᄄ◳耭窤㮁╛湥亁緗㽀筤㬬駊㝋㚆啄ᅄ▻耬暌杮戙湠満巂Ҳᗥ镆䙂䛇䐜試崂ݣ仠廢ᓶ㙎㚆啎塡表怽負囊㙇䃈ᨨ㙷坡捤奎馀㷠槽铄ᇶ睠䟨晲杯懰ጰ䟮鶒ڊᖩ鍆邂Ⰰ樽詣㩐鈛狠壢⡶怕☦溁鷒ߒᖵ镆䙚䛅䏜鎤䠖睠㝄⎌䙄䛌萼詠橰騛狠⍴䙑孰␐䠮顡遨尽負䎁ល䌚檣衠灨㐘晲杹戙湢亁跗㽀栉窠ᴁᇻ□溃㶷㽀㽄䌮馀⏕▧厤ڴ▻绠㓂㾷忰ሐ䠎鶒ڃ仠嬴䙅䛁菨ވ㟗懹ҵቼ鷓㙂䃈ᒭ䡁塨搼暌杭戙湥溁䷇䆑☝ቾ鶀㗠榽铄ሴ◳耭窤䚁╛湨◁緗㽁Ⴄ㬬駊㝐皣镄ቴ☋萬暢杪憙胨檭䡁偨㐘暊杹戙湥亁跗㽀逈暢邀⛀朽橢䩑爛狠䫂㒷忰ᴚ橤⍂ݪᖍ銠㞁Ⱋ茨የ㜧懹ԅ窠䖪㙈㚀锤Ⴄ♫萬暀杮戙湡玤ᅆ睠彤⎌䙎䛌萼詡詰騛狠㔔䙕孰ተ䚮衠桨谽負◡⏛茨ލ䡁㦑ڹቾ鶀㕠榽铄ሤ◳耭窤䦁╛湨躁緗㽁Ⳅ㬬駊㝒㚃镄ጤ☋萬暨杪憙胨欈㜷彡㭄䄮馀㣠棽瓍䡢塨搼暬杭戙湩溁䷇䆑☽ቾ鶀㧠榽铄Ꮄ◳耭窤亡╛湪◁緗㽁䝄㬬駊㝔皦啄Ꮤ▻耬暲杮戙湧亀巂ညᗥ镆䙝䛇䐜詢紂ᄋ仠嫢ᓶ㙍㚆啎塡硨怽負㢪㙒䃈ᒨ㙷坠譤奎馀Ⰰ槽铄Ⴖ睡㇈暤杯懰☰䟮鶒Ⴒᖩ鍆邂㭠樽詥䩐鈛狠竢⡶怕☪躁鷒ᄺᖵ镆䙫䛅䏜鎤䤆睠齤⎌䙞䛌萼詣詰騛狠匴䙦孰⤐䠮顢表尽負务ល䌚檥硢㡈㐘暤杹戙湨溁跗㽁㯩窠䞁ᇻ▨亃㶷㽁ᛄ䌮馀㡵▫ⵄቤ▻绠曢㾷忰▰䠎鶒Ⴛ仠紴䙟䛁菨ᕨ㟗懹ڽቼ鷓㙏䃈ᠭ䡂灨搼暲杭戙湪亁䷇䆑♙ቾ鶀㵠榽铄ᑤ◳耭窤媡╛湭◁緗㽁睤㬬駊㝚皣镄ᓔ☋萬曊杪憙胨洭䡂桨㐘暰杹戙湪◁跗㽁合曊邀㧠朽橤驱爛狠瓢㒷忰⢚橦洂ᄒᖍ銠䲁Ⱋ茨ᙈ㜧懹ݩ窠哊㙒皠锤ጴ♫萬暪杮戙湨厤Ꮦ睡㝄⎌䙤䛌萼詤橰騛狠朴䙨孰♰䚮衢䁈谽負䦁⏛茨ᕭ䡂憱ޕቾ鶀㳠榽铄ᑔ◳耭窤垡╛湬亁緗㽁此㬬駊㝛皣镄ᓴ☋萬曎杪憙胨浨㜷彡蝤䄮馀䉠棽瓍䡣灨搼曒杭戙湮亁䷇䆑⚉ቾ鶀䍠榽铄ᔤ◳耭窤採╛湯亁緗㽁魤㬬駊㝟▮橧ባ⚡因窠䝠㗐ᠨዤဂԁڰ暈䙘㙀⠀槤䪒ҡ䙈䚄㺁ⴛ湦◂緗㽀蝤㔮駊㙀⠀楤䨲ҡ䙈交懓㙌䊈▎崂ګ佦堟仴ድ☣䩀Ꮐ㚡⚹窤ᅊ㙅湦ⵄ߂ማ仠㪀旊㙀湦ᖇ嶗⚡鐭窠ᄡⴛ湠亂緗㽀ᛄ㔮駊䜈裗垀鴂㡁Ҡ癤◂䛵☢橠㡁槻櫠坆邀ក泽詡䩑创狠㫂┗怕㚳ꗰ慇膱⚨晠乢ቱ㕚檡塠⚠倭袠ᅓ孰ᑐ䦎顠聨簽負⥁ᔻ茺溔臝擋ꁈ櫦䙀㩁Ҩ暍䡠蝠仠㴦鞀យ胨ᆈ㟧彠坤兎馀ᰀ栽铍䩝芆閈⍴䢄㙞▰咄Ҳሣ櫩㒀ᄀ䛸茼詠㩑騙ҥዦ鷓㙀皢畎崂ګ仨䄔䡏孰ᒈᎭ䡀罡瀈晴䙗孰ᕈᅄ߇䇉ԍ贴䙏䛍䐈ረ㞗懹ԝቮ鷓宀ꌈ黹隶睱滠䃂䒷㙆皤镎塠遨倽負ⴀݰ㕜钄ᗷ䆑Ⴁ窤⡪㝉湣ᖁ鶗⚠堭窠㦁ⴛ湤躂緗㽀獤㔮駊䜒䞿碏㳢㡁Ҥ晴鞀ᛐᓜ䪁塠⚠尥赆䙊䛏䐈ᄨ㝷懹ԉቴ鷓孰㛚檡洂㛡Ԝ暆駑㙇茺橢橱稙ڑዪ鷓㙊㚁镎崄㓭鸧坔邂䝐ᒐ䨎顠表琽負⬁ល茨ᆄނګ琤晶駊㙡胨柍䡠轠狠但鞀❙胨ᇨ㟧彠孤兎馀⍀栽铍䩙洌ꆡꅴ䢃㙢▢橡嵲ڙԑ袤檀ᛐᒜ哎塠聨ꁼ晶杳戙湢躁䷗䆓仨䔔䡗孰ᓈᯍ䡁䝁搈暆䙛孰᧨ᇤᄧ䇉ڑ贴䙗䛍䐈ᑨ㞗懹ڝቮ鷓宀蛍砒晶睰鋠䓂䒷㙇皤镎塠ꂨ倽負㕠ᣐᒜ钄ᗇ䆑߉窤⡪㝆▣䩂鶗⚠尭窠⬁ⴛ湣◂緗㽀坤㔮駊䜟䤱窀䳢㜡Ԉ晶鞀ᛐᕜ䪂桠罠搥赆䙊䛏䐈ᄨ㝷懹ԉቴ鷓孰㙚檡紂㛙Ԑ暎駑㙋茺橢婱稙ڍዪ鷓㙉皡镎崄㑟锦癪邂⦰ᓐ䨎顠遨琽負ⵁល茨ᇤނڻ琤暈駊㙡䃈柍䡠齠因䴦鞀ᰙ胨ረ㟧彠捤兎馀╀栽铍䩟䰗貴㔔䡯㙅▢钄ޒګ櫨蚠⠠⍘茼詡婱騙ԍዦ鷓㙅皢畎崂ቻ仨㬔䡔孰߈ር䡀㝀琈晸䙳孰ᛈሤᄗ䇉ڍ贴䙔䛍䐈Ꮘ㞗懹ڑቮ鷓宀Ꝙꛐ跦睰狠㫂䒷㙅㚄镎塠硨倽負⠠ᣐᓜ钄ᒇ䆑ڭ窤Ꭺ㝂▣詢涗⚠搭窠ᗁⴛ湡◂緗㽀㝄㔮駊䜓觜䈏㳢㜙Ҩ晶鞀ႰᏜ䪀塠睠吥赆䙂䛏䐈ڈ㝷懹ҩቴ鷓孰⎺檡崂㚡Ұ暈駑㙊䌚橡橱稙ԑዪ鷓㙆㚁镎崄㗧⨾㼸邂⠐ᑐ䨎顠聨琽負⥁ល茨ᅄԂړ琤晦駊㙋胨曍䡠睠㛀㼦鞀ዹ胨ᄨ㟧彠佤兎馀ក栽铍䩜㓟峱ꍴ䡗㙁■钄Ԓڛ櫨庠ዠᦘ茼詠婱騙ҭዦ鷓㙁皢畎崂ᅛ仨䄔䡏孰ለᄭ䡀杠堈晨䙅孰ᕈᄤ߇䇉ԑ贴䙏䛍䐈ረ㞗懹ԝቮ鷓宀蠃ꚿ繆睰因䃂䒷㙆皤镎塠遨倽負ⴀᆐᑜ钄ሇ䆑ڍ窤Ꭺ㝂▢橡鶗⚠倭窠ᗁⴛ湡◂緗㽀㝄㔮駊䜣啁蘠⍂㚙Ҩ晦鞀Ⴐᓜ䪁በ㽀尥赆䙂䛏䐈ڈ㝷懹ҩቴ鷓孰⍺檠紂㙹Ұ晾駑㙇茺橠驱稙ҽዪ鷓㙃皡镎崄㒦㔊晤邂┰ᄰ䨎顠偨琽負ᠡល茨ބԂګ琤晰駊㙊䃈曍䡠杠㛀㔦鞀ዹ胨Ⴈ㟧彠䝄兎馀ᖠ栽铍䩞ꗅ㧼ᙔ䡍㙁■钄Ԓԋ櫨䲀ዠᐸ茼詠婱騙ҭዦ鷓㙁皢畎崂ޛ仨䌔䡊孰ቨᄍ䡀彠栈晨䙆孰Ꮘငݧ䇉ҽ贴䙊䛍䐈ᄨ㞗懹ԉቮ鷓宀鄂悺嚦睰曠䋂䒷㙇㚄镎塠顨倽負㑠ᆐᄼ钄ᄗ䆑ԑ窤Ꭺ㝂▢ᖁ䵷⚠䠍窠ᗁⴛ湡◂緗㽀㝄㔮駊䜮子茀紂㛉Ҩ晦鞀Ⴐᔜ䪀衠㽀急赆䙂䛏䐈ڈ㝷懹ҩቴ鷓孰ᑚ檠紂㙹Ұ晴駑㙅䌚橠驱稙ҽዪ鷓㙃皡镎崄㔔淺鑮邂ᛐᄰ䨎顠偨琽負ᠡល茨ބԂڳ琤晬駊㙇胨曍䡠坠㛀㔦鞀ዹ胨߈㟧彠㽄兎馀ᒠ栽铍䩝㭗赥餴䡎㙁■钄Ԓԋ櫨㲀ዠᐸ茼詠婱騙ҭዦ鷓㙁皢畎崂ګ仨㤔䡈孰ᆈᓍ䡀彠瀈晨䙙孰ቨ߄ڷ䇉ҽ贴䙈䛍䐈Ⴈ㞗懹ԁቮ鷓宀ꈃ㼸㷦睰滠㣂䒷㙄皤镎塠灨倽負⛀ᆐᄼ钄ޗ䆑ځ窤Ꭺ㝂□橡⏗⚠䀍窠ᗁⴛ湡◂緗㽀㝄㔮駊䜤婃㙏崂㛁Ҩ晦鞀Ⴐጼ䪀衠㽀䰅赆䙂䛏䐈ڈ㝷懹ҩቴ鷓孰ᗚ檠紂㙹Ұ晰駑㙄䌚橠驱稙ҽዪ鷓㙃皡镎崄㑿ꜷ魖邂☰ᄰ䨎顠偨琽負ᠡល茨ބԂڋ琤晬駊㙅䃈曍䡠坠㛀㔦鞀ዹ胨߈㟧彠㽄兎馀ᒠ栽铍䩟䋼ᑝ鼴䡕㙇■橠嵲ҹҵ袤㑠Ⴐᄼ哎塠䁈ꁼ晦杳戙湠躁䷗䆓仨㤔䡈孰ᆈᕍ䡀彠耈晨䙝孰ቨ߄ڷ䇉ҽ贴䙈䛍䐈Ⴈ㞗懹ԁቮ鷓宀顈稵縶睰绠㣂䒷㙄皤镎塠灨倽負⛀ᆐᄼ钄ဇ䆑ډ窤Ꭺ㝂□橡⏗⚠䀍窠ᗁⴛ湡◂緗㽀㝄㔮駊䜨頊䴍䡠靠☠⎂䙂㙄芨朤Ԓڋ氭負ጡ㕻湠溂巗㽀⚤㬮駊㙈䃈服䡠彠㛀㜦鞀ᖹ胨ဈ㟧彠䍄兎馀ᔠ栽铍䩞擵㣄ᑔ䡐㙂皧畄ڔ☻萬晪杪戙湡䩀䡀燻櫠Ⲧ邀♕☠鎤䚢ԁҽ赂䙄怕□溃䷒Ԓᗕ镆䙆䛃萼鎨㺙啅驩窤㝠Ⴐߜ䩀塠凩◨晤䙅弙茨ڨ㠧彠Ⳅ䴮馀ᇠ棽铍䡁冱◅窤☊㙃▩ⵄڲႣ仠◠䦪㙄□橠鶗⚠䐍窠◡ⴛ湢◂緗㽀䝄㔮駊䜜圛䑀䳢㛩ԅዼ鶀ᘠ欽铄ݴ◳萬晲䙃㙂茼䩂䵶睠耈橤邂ተᆈႮ嵲ԓ琈晨杺懰Ⴐ䣮鶒Ԃᖝ镆邡ꕭ鋚䛍䡡㝀☠⎂䙂㙄芨朤Ԓڋ氭負ጡ㕻湠溂巗㽀⚤㬮駊㙇䃈服䡠彠㛀㜦鞀ᖹ胨ဈ㟧彠䍄兎馀ᔠ栽铍䩙䌗Ꭴ⣔䡎㙂皧畄ڔ☻萬晪杪戙湡䩀䡀燻櫠Ⲧ邀◕☠鎤䚢ԁҽ赂䙄怕□溃䷒Ԓᗕ镆䙆䛃萼鎨䎎宭䙙窤㙠☰ݨڮ㡀㽀㰄檂䙂㙂芼铄Ԕ⚓苠⋂㦷忰ߐ䞎鶖禱◅窤☊㙃▩玤ڲႳ仠◠䮪㙄□橠鶗⚠䐍窠◡ⴛ湢◂緗㽀䝄㔮駊䜝诊㲠鴂㛱ԅዼ鶀ᘠ欽铄ݴ◳萬晲䙃㙂茼䩂㵶睠簈橤邂ተᆈႮ嵲ԓ琈晨杺懰Ⴐ䣮鶒Ԃᖝ镆邡綩䤣畭䡡⚠☠⎂䙂㙄芨朤Ԓڋ氭負ጡ㕻湠溂巗㽀⚤㬮駊㙉䃈服䡠彠㛀㜦鞀ᖹ胨ဈ㟧彠䍄兎馀ᔠ栽铍䩘售䢍餴䡒㙂皧畄ڔ☻萬晪杪戙湡䩀䡀燻櫠Ⲧ邀⏕☠鎤䚢ԁҽ赂䙄怕□溃䷒Ԓᗕ镆䙆䛃萼鎨䁝㘼籉窤㑠▰ݨڮ㡀㽀㰄檀䙂㙂芼铄Ԕ⚓苠⋂㦷忰ߐ䞎鶖禱◅窤☊㙃▪ⵄڲᄻ仠◠䷊㙄□橠鶗⚠䐍窠◡ⴛ湢◂緗㽀䝄㔮駊䜥馚幯䳢㛩ԅዼ鶀ᘠ欽铄ݴ◳萬晲䙃㙂茼䩂⏖睠耈橤邂ተᆈႮ嵲ԓ琈晨杺懰Ⴐ䣮鶒Ԃᖝ镆邡麫刄痭䡡Ⴀ☠⎂䙂㙄芨朤Ԓڋ氭負ጡ㕻湠溂巗㽀⚤㬮駊㙈胨服䡠彠㛀㜦鞀ᖹ胨ဈ㟧彠䍄兎馀ᔠ栽铍䩚䍝浍鼴䡑㙂皧畄ڔ☻萬晪杪戙湡䩀䡀燻櫠Ⲧ邀⛕☠鎤䚢ԁҽ赂䙄怕□溃䷒Ԓᗕ镆䙆䛃萼鎨㿝ᴜ塕窤㡠⎰ݨڮ㡀㽀㰄橼䙂㙂芼铄Ԕ⚓苠⋂㦷忰ߐ䞎鶖禱◅窤☊㙃▫玤ڲᅋ仠◠俊㙄□橠鶗⚠䐍窠◡ⴛ湢◂緗㽀䝄㔮駊䜒䥹㳏紂㛱ԅዼ鶀ᘠ欽铄ݴ◳萬晲䙃㙂茼䩁趖睠簈橤邂ተᆈႮ嵲ԓ琈晨杺懰Ⴐ䣮鶒Ԃᖝ镆邡楕针㘭䡠靠☠⎂䙂㙄芨朤Ԓڋ氭負ጡ㕻湠溂巗㽀⚤㬮駊㙈䃈服䡠彠㛀㜦鞀ᖹ胨ဈ㟧彠䍄兎馀ᔠ栽铍䩟ᯅ偬ᑔ䡐㙂皧畄ڔ☻萬晪杪戙湡䩀䡀燻櫠Ⲧ邀♕☠鎤䚢ԁҽ赂䙄怕□溃䷒Ԓᗕ镆䙆䛃萼鎨㾨㫞婥窤㝠⚰ݨڮ㡀㽀㰄檄䙂㙂芼铄Ԕ⚓苠⋂㦷忰ߐ䞎鶖禱◅窤☊㙃▭厤ڲᇻ仠◠嫊㙄□橠鶗⚠䐍窠◡ⴛ湢◂緗㽀䝄㔮駊䜄岗撀㳢㛩ԅዼ鶀ᘠ欽铄ݴ◳萬晲䙃㙂茼䩂䵶睠耈橤邂ተᆈႮ嵲ԓ琈晨杺懰Ⴐ䣮鶒Ԃᖝ镆邡賗从暭䡡㝀☠⎂䙂㙄芨朤Ԓڋ氭負ጡ㕻湠溂巗㽀⚤㬮駊㙇䃈服䡠彠㛀㜦鞀ᖹ胨ဈ㟧彠䍄兎馀ᔠ栽铍䩛嘮⢔⍴䡖㙂皧畄ڔ☻萬晪杪戙湡䩀䡀燻櫠Ⲧ邀◕☠鎤䚢ԁҽ赂䙄怕□溃䷒Ԓᗕ镆䙆䛃萼鎨䅹痦䙍窤㙠☰ݨڮ㡀㽀㰄檂䙂㙂芼铄Ԕ⚓苠⋂㦷忰ߐ䞎鶖禱◅窤☊㙕㚀锤ᐤ♫萬暴杮戙湩玤ᒖ睡罤䔮䙶䛆萼試詰稓琈橼䙆孰ለ⏍䡀䝁耈晰䙆㙃茼䩀鶖睠䝄孎䙈䛊萼詡ᖐ戛琉ᔕ筂ꆢ䃈榄ݴ⚓苠㣂㦷忰ጰ䞎鶒ډҬ晪駑㙈茺橢紂㙓仨◠ᰀᖹ芨ߎ崂Ԃᗩ钠ᗁ⢻茨ݨ㚷懻佧䕩騼ᐵ☤䩀䡀䇉Ҩ晲鞂ᒐ߈ᄎ㵷㽀⚤捎䙂䛉萼詠䩐稛琈暄邂ᐵ☡詠桠槻櫠㜦邀ᔠ泽詠驱创狠㓂┗怕㚼ꊗ䉐妱◨晪松懰ᄰ䢮鶒Ԋᖩ镆䙅㙁▢哎㡀姻仠匴䡃孱ᆈݤڷ䇉ұ贴䙆䛍䐈߈㞗懹ҹቮ鷓宀ꉁ帴曖睰章ᗀᓱ㙁湡咄䞢ұҵ襆馀ᇠ淽詠婱䇻狠⋂⡷怕▤ⵄ䛖睰䟨暸杣慰⤐䥮鶒ᅂᖹ镆䙨孰㑚橥婰䇱ލዲ鷓㙕皣畎塢憱ߝ窠㒁╛湣溁緗㽀彤㬬駊㝁㚃镄Ԅ☋萬晤杪憙胨桤ڦ睠䋀ꅴ䙂㙂䃈Ⴄڢԛ琤普駊㙄㚆畄ݤ♋萬晰杧戙胰摘込些仨媠⛡㕻湢亂巗㽀䭄㬮馀ᘐ߈ގ嵲ޓ琈暒邂ᄕ☡ᖀ衠槻櫠Ⲧ邀ዠ泽詠橱创狠☢┗怕㚥䑔䂧榱◸晤䙃廰ݨᄎ㡠坠⭀㤢駓㙁㚇畄Ԅ☻萬晤杪戙胨ይ䡠冱▼晨䙈怘湢㒭䡀恨逼普杵戙湡躀鷗䆒ᰂ⛙賘孱ᗈވ㠧彠㭄䴮馀ᐠ棽铄ڒұԅ赂䙆怕▤玤䙶睰㻀◠┓廰Ⴜ鎤ڤ♳苠⭂㮷忰ᆐ䜮鶖硯鉟鵪ꀊ㝉▥䩀䡀䇉Ҭ晪鞂⢐ݨގ㵷㽀Ⳅ捎䙃䛉萼詠婰稛琉窤✊㝄▱厦蚁蝠ݡ⬀㝠ᘠ淽詡㩑䇻狠㣂⡷忰ጨڤڗ䇉ڕ贴䙚孱ݨᄎ㡡⚠⭀㤢馀Ⴐߜ哄Ԅ⚓苠ᘂ㦷忰ݰ䞎鶖睠耈橪松懰ᄰ䢮鶒Ԋᖩ镆䙅㙁▢哎㡁⦻倈橦䙅廱ᗈڄڗ⦹Ҩ晦韓㙁皧畄Ԕ☻萬晦杪戙胨ጭ䡠熱繨㺀Ԁ䗐ݨᦈ㙷坡孤奎馀㳠槽铄Ꮦ睡谈暀杯懰ᖐ䟮鶒ݢᖩ鍆邂▰Ⴚ橡በ坠䐍袠┓孰ተ䦎顠桨簽負◡ᔻ茺溝揼ⳓ逈橤邂ድ⻀楤Ңቩԅዼ鶀ᘠ欽铄ݴ◳萬晲䙃㙂茼䩂㵶睠❈橤邖Ⴄ■ᖇ塢轡彤⎌䙮䛌萼詥詰騛琈晼邀䕠樽詧詰鈛狠ꌢ⡶怕□鎤ڂԑԁ赂䙆怕□◃䷒Ԃᗕ镆䙄䛃萼鎨䖼斗葍窤⏀ᐵ☡厦蚁䝀ݠ麠ዠᇸ湠橡㵒㚱Ҭ晲韓忰ݰ䨎顠㡈琽負ጡល茺橠鴂㙻伸ᖈ䙀㙗▬亀巂ᆊᗥ镆䙱䛇䐜鎤ᔦ睠杤䔮䙐䛆萼詢ᖐ稓琈晬邀ᏐႨႮ嵲ڃ琈晪杺懰ᄰ䣮鶒Ԋᖝ镆邡ꀘ韌闭䡠䝀⭀圴邖Ⴈ■ᖀ㡀彠☠㤦鞀⏙胨ဈ㠧彠䍄䴮馀ᔠ棽铍䡀䦑繨ҷ澀Ⴈ䘀嘤噤☣勨㲈Ң䙁㙈Ҩ䖐⡸㝁በ㚥㝀湠亁Ⴄ覺ᗑተ㚌尀橰䝂ᙆ聯詝鴴柗开薺檠䩐ቨ杤㙠犡ᄚ䄈暄ԂҪ䪬晠獭ႰҰ䛍䩐曢囤☣蛹虠⠀晨眰⠈ݠ♶䝃ᄀݰڏ驰Ⴀ㝄㜬䡀䣆晦溃顠䡏ꡟꔎ煭ҭ□◀衠ᒹ□糢䖱憀暼䩀ᖐ⨣卤ꍴ⤢ᐠ曽◝瀜ң伀ᖀ䡀ዠ□ᖀ睤硨ꑥ躢␁Ұ暠蹠䩂Ҡ柘橤䙄䫆晨ڄچ罰☠⋞Ⳁ㙀◠䩀䡠㺨Ⴄڂᒌᆅ湠◂洂晰ݨᗀᰀႰҨဈ㠗塨㠅竢㚪㩁Ҩ晨頒ԑҨ岢ᰀᔠ暽ᖠ顠ڨԌ晬ᗀ㙃◠ᆀ䛲Ҩ婨㳂ԁހ暨ވ㠷⨠枡ᕁ䀀Ҵݠ㑤䙄仈⭀Ԁ糈䛁䍐揳扠ᓑ䙈ڄڅ⋁椠蹤ҢҩҠ䛼䡁㙂㨈Ԅچ罰㻀⋒鞂Ⴍ溠䩀衠㽀☌桦䙀◄滠ᇠޒҪ㩴ᖖ桌瓀ҪڀዠႠ㝽በ䙃㙀□⺩預蹩Ҥ橠䙄◑溡䩀Ⴁ湲ݠ⋂㚁ᖈ㥓蛨በႠ㚁嚠កᆈ㤈ڨ㹀㢸㝀晪䙃▬ᒀ柄Ԕ▻绨Ꮒᓴ䜲䲰ҭ䡐噳ꎧ従晠㩁Ҩ暨㙒ҫ盨ᑢᗀ㙃⠀条晰聮飇Ҡ䙁㙁䋍暠በ嚹ᖄ晬䙅䅁ቨԄړ噰因⡀ᰖႦ□䩀㦠㚀噤㲀ԀᆐႺ桨霒Ҡ柴橦Ⳃᯀ椰䡄Ҥ◃佤䛂▰䱠蔺橠ᘱ聨䚁㺂ᖂ䙁㙀湠乐㡀⚡ᔹ䀀Ҵݠᗀ㡀䡈㐘橠板廱ݽ檠詰䇊㩑ڀᗁ鲮噠ᛀ䙄軈䋀⪺ᄡ隬陠ᛀ䙂㙂㩴㒀Ұ冔㚀瓨䔉葠ᇨ癤Ԃݨ㷈ݭ塰㽀ᗁ㢄Ҥ䙁癨Ңᨢԃ勨ᗀᒠႰߒ䪀䟲▹Ҡ晢䙂⻐暨Ңᘒ㙀婠㱖䙁㝁□ቬ塰Ⴀᗀ墠ᓁ◀桤✩㜐你☠◀纀Ұ߄✈䔉豠ހᖀ䡁䣆杨Ԉ㙷坰ᛄ⎈桄獀Һ檀驿䬦Ҡ癤ԁᐠ鶆幠Ꮐ㙁▹ቢ䙁䛏芽ᗀ㵔仈☠㒐ቨᯁ椠湤ڤ⪛獤ᑢ䙀孱ߐ䚮梀ቯ壇Ҡ邈Ⴀ☡溁⍂晰ݨᗀځ颬陠ⵄ䙄庂ݠᗀԖႦ■ᖀ䦠㚀噤㳃苹虠■亏衠䇻欸ᖀ⤠ᒐߐ䚮杤彠㺁炢ᒌᔅ曰◀㡀㧠枠晬䙂悘橵獤䙤▻盨ݣ鋹虠䃊ڀዠ䁈䟨癤ԂݰҰ拳䉀ᓑ□㑈暀ݰҭ暡桠Ⴀᙘᖐ⪡ᦀ鶆幠ᖝ謮Ҡ癤ځ数ݽ钆蚀ڙҬ晨㚘㙁湡ቬ墀坠⚤⎈䙄寱ݤ✈䔉豠ހᖀ䡀ዠ■◀巂㙂ᖍ軣諹虠䃈䜨䖉豠ހᖀ䝅ᄟ盗㥸Ң晰ݨᏂᄀԀ渼哤䙇◂ݠ㒐ቨᯀ椰懳䉀Ⴀݠᑤ屢Ұሂ誀በ彠㬘ᖐ䙀㙂珠柤ڒԙ繨㺀កһݢᅈ䖉豠ݠ⬬በ䜶䵰Ҥԃ噰ݠᰀ讁ᆆᆂ躛濼ҡҤ晬颖Ⴀ□蟄㙒ԙҴ鉤◀ݰᄭ暡桠你䌘ᖘ䙅㙀珠条婿䬦Ҡ晠屢Ԁꇇ㹀በ㿰■㹂⤠Ⴐ߈ݭ䝄庹Ҩ䜊䡃⋀椠湠䩀㡀⚠ᘀ桌瓀ҪڀዠႠ㝤☠桐瓀ҪڀዠႠ㝬䁆杠㛁湢詠橰ݣ㫈ߖ䙀䛄ᖓⵈ㞄◠枑竢㚁ᖈ㥚溁⍄⪤Ұ䛘㙶㙅灠晤䛄仈㻀㲐ቨ㛆㚿㧘Ңڙ䙈◤⡁ꕎ噠ᛀ䙆睰ᙘᖀ柠畀Ұ噳艠ᄠ■橠䙁㙀■促姀㙂▂忠ԈႠ㞃䙨㺉鑠ݤҦ暀Ҩ㲈Ⴈ蜰㽀ހᖐ䡀⋀ᑃݡ婿䬦Ҡ癤ԁႰҨݭ墀⠈杤㙠犩ዠ㚽㧘Ҥ□繨ݣ鋼虠⠀晤㙄㖤饠ݢԖႠ■橠Ⴄ彠◡炢ᒌᒅ湠橠杦㽈Ⴇ羙晠㙀珠晨䖉豠ݠڬበ㙀■䡉塠㝀㚁嚠ተ声朣ށ婹歎Ҡ癤ԂԀ晨ႤҤ鼺㩑ݣ㻝虠▢⍠䙀聬飗Ҡ桟㗛ݠ◒➜ҡԐ鉤ځ檮陠ᖁ䦠㙂ᯒ懠Ԁᖛݠ◞✼Ң┲姠ԖႠ㚾㥸Ҥ㖤赠ڬበ䜶䲰Ҩ䒉瑠ߘᖀ柠珀Ұ擳䉀ᇰ□ᕩ䀀Ԁꇆ幠ᓠ㙂ᰂ寠ځꕌ陠⍠䙄㘤赠ݣ髹虠⻀晨㽉籠Ⴆ⛕晠䅁Ұ図剠ቯ飇Ҡ屢Ԁ貆繠ᖘ謶Ҡ鉤ځ沭噠◐瀌ҡ繨ݣ䛚虠㚥㦘ң噰Ⴆ侕晠䜆䳰Ҧ蚀ቭ䢫Ҡ柼珀ҭ暠ᖙ謶ҡᒩ䄀һݠ◖❌Ң⋒寠ԖႠ㚩㦘ҤⲤ酠ڬበ䜖䳰Ҩ䂉籠ߘᖀ栘珀Ұ寳剠ᇰ□ᓩ䄀Ԁ醆繠ᓠ㙂⎢寠ځ肭噠⍠䙄㐤酠ݣ嫺虠⻀晨䋉籠Ⴆ龕晠䅁Ұ廳剠ቭ飋Ҡ屢Ԁ骆繠ᖜ䬖Ҡ鉤ځ貭噠◘瀌ҡ繨ݣ绺虠㚳㦘ң噰Ⴇ侕晠䜦䳰Ҧ蚀ቯᎫҠ栴珀ҭ暠ᖝ謶ҡᔩ䄀һݠ◝❌Ң┒寠ԖႠ㚹㦘Ҥ㔤酠ڬበ䜸䳰Ҩ䒉籠ߘᖀ桘珀Ұ揳剠ᇰ□ᕙ䄀Ԁ龆繠ᓠ㙂ᯂ巠ځꃭ噠⍠䙄㗤酠ݣ鋺虠⻀晨㻉葠Ⴇ龕晠䅁Ұ旳剠ቯ磋Ҡ屢Ԁ誆鹠ᖘ䬞Ҡ鉤ځ梭陠◟瀌ҡ繨ݣ㻛虠㚣㦸ң噰Ⴆ㽷晠䜂䴰Ҧ蚀ቭᎯҠ柴瑀ҭ暠ᖙ䬞ҡᒙ䈀һݠ◕❜Ң⇲巠ԖႠ㚧㦸ҤⰄ镠ڬበ䜘䴰Ҩ䂉葠ߘᖀ栄瑀Ұ姳扠ᇰ□ᓱ䈀Ԁ醆鹠ᓠ㙂⍒巠ځ碭陠⍠䙄㑄镠ݣ嫻虠⻀晨䆉葠Ⴆ羗晠䅁Ұ彳扠ቭ飏Ҡ屢Ԁ閆鹠ᖛ䬞Ҡ鉤ځ躭陠◘瀜ҡ繨ݣ櫻虠㚯㦸ң噰Ⴇ垗晠䜦䴰Ҧ蚀ቮ壏Ҡ栤瑀ҭ暠ᖞᙞҡᔩ䈀һݠ◚瀜Ң⏒巠ԖႠ㚺㦸Ҥ㔤镠ڬበ䜮䴰Ҩ䎉葠ߘᖀ桄瑀Ұ懳扠ᇰ□በ㚥㝁皢ቩ桰塨睤㙠犁ᄀ橰䝂ᙂ▩Ԁ晰㚥㝀㚂ቩ桠ᓙ■䜆䝅䜸䵰ҤԒړ仠Ⲗ䙂寰ښ詠⍒㙙繨ݣ黼虠□䴀䙂ԉҭቢ颖Ⴂ㚀ቬ碀塨䚁㺂ጡ⠠桤✤㙔☢ᖠ䛘䝀㙂湠衬塠Ⴀᘀᗀ⇫宕⻀曨㾉鑠ႦႡҡ䅁ңڡ塠ݣԔጠҰ困ᒑ蠀㡀ቯ裓Ҡ乢Ҩ㞑䟠㡀Ⴀހᖈ䙊孻ݡ◞➌ҡ䙈ڂᄡꋮ噠ᛀ䙂㙁Ҡ䜊䡀䛄ᖓᖀ⍒㙀柬桪桐瓀ҨԄކ睠ᇬ橦屢Ԁꔧ㹀በ倐■晪䙃䛀苭暠橰ݣ㫈⭂▰䱐曰䣈㛁Ꭱᖅዠ杨◆◠ᖀ硠㻃⭀ڀᄀႰᆚ鎭䦠㙢ᴒ懠ځ暠䙀䴀䙀虰卧螙晠㙀□⺤䙓噰Ⴇ鞙晠䜼䵰ҥԀႰ☠◀覂һݠᖀበ⠈᧨鉤ᖠႰႤ⤄ԁᒩᖌ㹄⥁犮陠◓➜ҡ䙈ڄԀᖐቨҩ堓噰ݠ㚀⡪㛀盁㧸Ң■⚠⋀䙁㙀⠀晨隤Ⴀހᖐ䡀⋀楠柁塠ݣԔڀҰ困ᒑ蠀በᄠ■桦䙀㙄⻀晤Ңҡ䙈◠⡪䅁ႨႢᴒ㙲ᖠ䛘䝂㙁橹䪀㩐曢囤ڀ◀Ⴐᆚ鎤䚒Ԁ柬桮䙅㙂ᖖᖀ塠Ⴀᦍ窤Ԁᐵ湡⺤㚀㡁ҡᕱ䌀Ҵݠ⚀橤㗤饠ڐበ㙀㟃䙤ҡᐢ㩑Ҥ暀Ҩ㷈木㹀㢸㝀晠㙙ᯀ椨Ҩ㜆瞠■橤䙀䛄䃊ڀዠ⠸㝀晢䙂䅁ᒈڄҳ噰䙰ቶ格獀Ұ懳䉀ᄠ□ᑼ䙆䛁菽钆蚀ڙҰ晬邁ተҨ߂ᰒ■勠㒀ᖠҨ㟈ݨ㹀㢸㝀普䙄▬□䡌硰㺠㩬晨杣慱Ұ䚮橾䬎ҡ窢ቢ昀鶆幠Ꮐ㙁▥ቢ䙀恱Ҽ䛈በ㞀◀㹂⥁钬陠ᖀበ⦱繨ڀቫ㛀■橠駀㚁Ҡ普屢ᯐለچ蚀蝠䋀ڬቨ㙂橹䩠圠䚚▂忠Ԁᔛݠ◞➌Ң╢忠ԈႠ□ⵄ䙃噰ݠ㒀ځޙ⻀曤ڑᒩᖌ㹆⥁ꃮ噠ᖀ駀㙂╒忠ځ鲮噠ᛀ䙂ԃ仨ڬበ㙃湠ቩ塠代㫄ᯘቫ䜼䵰ҥԀႨ䭆⛛晠㛀ݰڨበᄠ■晲獤䙐Ҥ⤤ݴ终◌晠乢ᖑң䙁婰ႨԌ晲䙀◌满躂橰曢囨䜖柉孱ڄⰄ䙄◠析晠醀ޕ☠ᖀᖑቨ䚁㺀✊䫍滣䡌硰靠嫠䙠要Ԁ晤Ⰴ䚔◠析桦杴䛄ᖓᖠ話ቨ䚁㺂ዠᖐቤⰄ䙔◠析晢醂ݨ㼈䠨䕉豠ݠ⡀⡪㙁脨ߍ塠㦙ҥ粤ពႠ㚾㧘Ңڹ繨ڀ㕠ᐠ暼洠䚄■柴橦杨◆◡溂橰曢囤ᘂ㚁ᖈ㥈䙤ဒԈ柬晢䙂㙃■鏍䳣噰㝆供晠䜀䙠Ԇ蚀Ⴀ嫠䙠纡梮陠ក䙂☩ԙተ邡沮陠ក䙃幰ݠ䊀㝷Ⴀ㚤㧸Ңڡ繨ݣ☽虠▢洠䙄⫤鵠ڀ◖Ⴀ㚣㧸Ңڱ繨Ҧ暀Ԁ杤⬤㙒Ңᖜ鉤ᖠᔐڈ晨㚆碸婠㲀⛀⍃ᓀᖁ㡀轠䯬橠䙉㙀ᖘ表衠ቬҩ䑈暀ᘐҤᒁ晰罠Ⴄ⎌䡀䛁荰拳䉀ᓑᖈᚾ格獀Ҫڀዠ⠈ᘀဈ䡀廢㙈څԀ曀ᖭᔹ䀀ҰҨԎ䦠㙁Ҩ㲂ԀႰጭ暡በႠ䬘ᖘ䙉㙁⻀柤ݲҡ繨㙖杠㛁盜㧘Ң晰ݨڀᗍ⋀㚼㧘Ңҡұ粤ᄖႠ㚾㧘Ҥ㘄饠ڐበ㝁□ቬ墀ᇰ■晠䙁䛀苭暠桠㝀㚁嚠ተ声朢詡婱ᓑ㙀晦⨲⎠柿諀ᖔᓑ▸湠ጠᄀݰڈԄҲҩҤ暀Ҵݠᗀ檰䡀噤㳃晠㙂䄈杄Ԅ纂ݠᗀᗪ㝁湡⛁皂Һ⎠ݶⳃ㙀□ⵈ㚆睠ᘀᖠ幺ᯄᑈݨ䉐Ꮈ婬晠杤孰Ⴚ橠㡀廡蛈晠杠䅁ҨڥԀႠ㻀ڐቤ㝂㚆㓄ڄ◣睦Ⴁꊧ弙□◁┄⪧鹭袠ᗁ⫻䋜洠䙂ԑҡተ邈Ⴀ☡◃␂Ԃᖡ軣ݠꔃ芼橠橰樒ᯃꊦ鞀ዠ汽璮䦠㙡Ҹ晠杬孴ݠᗀ橱樁ұተ骡暠敡钎䡀䡈䠙ᒁꔃ廰Ⴐ䥎趇㟰◀晬䙀䛈䃊ڀዠ䡈蠰晨杨悀蚀䗀鵷㝀㝄㜬柠ꙁ芨ݨ㟇姳漸ᖘ䙆㙀㚅ⵅԀႰ㝄坈䙄䛄䍐噰㘀懫滠☢☖䜀无钄ڄ♣耩諌ተ㙃■◃⍂晰ݨ☢㺴㙂㚂㓈㹈▀䐅誠ᗁᖻ㚠䘀嵲Ԃᗡ鍄颖Ⴊ□橠ᖑ覱䙈ڄᗁ⫺□◁␄⪤ᕰ㔢颀ዠ桽源㘠䇉ұደ鳒彻ݦᖀ衠ቩᇨ癤Ԃዠ汽ᖀ橰樂ᯂሸ┑彰Ⴐ䝎詸▐㐄晨杸憙䋍暣桠坠Ⴄ漴乢ұႰ䥎桠䡈䠑ᒁလᔸ苨ݨ㛇塬ᕸ⎂䙄䛌䏜璦蚂Ⴀ㻀ݢ今㩁Ҩ曨㟇䝀㝄㜨柠曞ሜ咤ڄ◣罦ሼᓱ㙂㚆㔎䵣噱㛀⬀ځ㱵⠀晤䚄♣盠☢☔䜀䙿ဎ㵢Ԃᖡ鋣သᇸ湡◃┇㧑繨皠ᰀԀ牺歠䙂㙢ᗡ躠ᗁᖺ㚠㙟曗⦱ұተ鲡曟ߜ䩀橱樓瀨鉤劀ᒐҰ䳍䣀㙁▱ደ骀ዠ桽◐▯蚛氨晨杨憀蚟曎㡀䡈蠹譄屢㹐ᆈҨ㧆瞠■橨杸恰Ⴐ䝎橸ᖇ陽襄䙄䛄䏐噿蚗⚠㝄坌飒䅁Ⳉ߄Ҥ➣伀ᖀ䡄䛌䍈ݨ㛇䡌ባ鹮韒㙂㚂㔈㹏陻櫠☢㺶徙⻀浤ڢҢᛁ粰በ㝂㚆㓄ڄ◣睦Ⴁꊧ弙□◁┄⪧鹭袠ᗁ⫻䋜洠䨂Ԑ晠㲀ዠᔵ滢◘Ҥ溂ݠ㒂ᖌᒅ朰ᖀ驻ꊚ劔◠␁䙵满ᖀ䫰躉Ҭ癤Ԁᒐڈဍ䡠徠Ҡ橪杸恰ᄰ䝎橸ᖇ陽襄䙅䛄䏐噿蚗⚠㭄坌飒䅁Ҩ߄ڴ◃伀Ҡ䡅䛌䍈ވ㛇䡌ባ鹮韒㙂皢㔈㹏陻櫠⢂㺶徙⻀曤ڢԚᖡ窰Ҡ㝂皦㓄ڔ◣睦Ⴁꊧ弙□亁┄⪧鹭袠ᠡ⫻䋜洠䛂ԑҽቸ邈Ҡ☡亃␂Ԋᖡ軣ݠꔃ芼橠穰樒ᯃꊦ鞀ᐠ汽璮䦠㚡Ҹ普杰孴Ҡᗀ穱樁ҵተ骡暠敡钎䡀偨䠙ᒁꔃ廰ᄰ䥎趇㟰◠晬䙇䛊䃊Ҡዠ偨蠰晪杨悀蚀䗀鵷㝀㭄㜬柠ꙁ芨ވ㟇姳漸ᖨ䙆㙃皦ⵅҠႰ㭄坈䙅䛄䍐噰㘀懫滠⢂☖䜀无钄ڔ♣耩諌ቸ㙃□躃洂晠ݨ⢂㺴㙂皢㓈㹈▀䐅誠ᠡᖻ㚠䘀嵲Ԋᗡ鍄颖Ⴎ□橠驲ᓑ䙀ڄᠡ⫺□亁␄⪤ᕰ㔢颀ᐠ桽源㘠䇉ҵደ鳒彻ݨᖀ衠恩㟨癠Ԃᐠ汽ᖀ穰樂ᯂሸ┑彰ᄰ䝎詸▐㐄晪杸憙䋍暤桠坠䍄眴习ұᄰ䥎桠偨䠑ᒁလᔸ苨ވ㛇塬ᕸ⎂䙅䛌䏜璦蚂杠㻀㓂勊㩀Ҩ月㟇䝀㭄㜨柠曞ሜ咤ڔ◣罦ሼᓱ㙂皦㔎䵣噱因⬀␁㹵⠀Ҥ䚔♣盠⢂☔䜀䙿ဎ㵢Ԋᖡ鋣သᇸ湡亃┇㧑繨蚠ᰀᔠ獺歠Ң㙪ᗡ躠ᠡᖺ㚠㙟曗⦱ҵተ鲡曟ߜ䩀穱樓瀨鉤媀ᒐሐ䵍䣀ҡ▵ደ骀ᐠ桽◐▯蚛氨晪杨憀蚟曎㡀偨蠹譄屢䉐ᆈဈ㨆瞠Ҡ橮杸恰ሐ䝎橸ᖇ陽襄䙇䛄䏐噿蚗⚠䍄坌飒䅁㕈߂Ңԁᖜ晰枠孱ተ义地ژ噴㲀ᖠᇠ鎂幠Ⴂ陠勠⋃晠䜚䢰Ңᑐڙұᔀځ肤陠ብ虠罠䋀㓂曋䜚䢰ҢᑠڙҽᏀ醀ᄀ鎂幠Ⴂ蹠勠◠ጭዠ■◀洂ҩұ窠▰䉍▢ᖠ䜀◹Ұ晤栔歀ҤᨠޒҡҠ癤Ԁᄕ⻀晤ڤ⠃勰ҷ獬ݰ䘈虨䉀⥙▰湠䙄䛜䃈楨䙃幸ݠ☢囊㝌盠⎀噢Ԃᘡ窤䂂һ朠ᖀ橲ᓑ☍ᖀ嵣ҰႰ䥍䡡衰ߜᯀ䙄䛈䃈樈䙃幸ݠ☢☊㝏㛀⎀噢Ԃ■鑦Ԁހ発檀硠⠉ꏌ☠䙘㙀□厤䚔➃伄Ҡ嵣Ұᴈވ㥆瞨Ҡ鑦ԀⳐᄰ䭍䣐ҡ艬ڀ䅠ᐠ湺殀ң幸ݠ庠ᠡ⫵⡀Ҧ隐Ⴀ髠⢂㚪㫀ҭ蛀ቡ靠㭄㜔你һ朠ᖀ桠侨Ҡ鑦Ԁዠꔀⵈ䙃幸ݠ☣陠宁ҭ蛀በ䡏䙁竤ԗᆀ□◜Ҧ硰ߜᯀ䙄䜬Һ溠ᓰ㹁ұᔠڪ䝀㐀虤ڄ㒀ᇩᖀ嵣ҰႰ晦隔Ⴀᛄᑬ䝡ᇠ■亘ҢҪ⎠ݲ䅢ᘂ㙈ݤ㚒Ԃᛁ粢⤠ᘐ榨Ҥ㚠䁁Ԍ晬占Ұᄫ䙀⏓癠ݠ㳂ᅊ㛅湡亀㳢◉ҹቢ邁ᒐᓐ噍䡠軈Ԍ晨乢买桨ݥԄ蝨仠◰ጨ㛆□ᛀ䩂☱Ұ癤檁ᔅ湠䩁㳲▩Ҡ晲邁ҰႨႦ蚉ҩҰ晴屢池湡ᖁ槀㪀ᘀ◠⏖ᄢڈݤᄃ噴Ҥ晨䙄㩁㭍暲晲ԁҰ癤纂ᏛކԄڂԁ䙉庤㑶ᄮڈݤڂ晳ݨ䢬ᐠݰႨݥԆ䝐缸ᠨᄀተႪڍዠ耐⢠ጠᖠቴݻᗀ觀㮠ᘀ◠ᖨᄘ☣䴀兠⚠㛀◰Ꮄ㝊⻀糠㡀䝀㛠ᚰ䡗䅁呠䩀桠䞀➰橲屢葠皡ᖢ䡀䞀⠰ጢ㕠ቴނԄ㛢ԁ䙊▢䝈㙂⠀磠㡑㽀㛠កᄁ▰ႪڐҲ◘Ⳁ晰䙓宀栽詢趒㚡ڍ竢✗㙊䌈橄ڲګ佤㔮䙐忱ᖈဍ䩐爙څ貤䙠◕㚃啄ߗ㽑☠⬀✊䛃萨ሮ墀齠䯩ቲ鶀⏙滣橡鴄☋苠Ⲧ䡑㙇䃐䢎顠燹◄晪䙋宀栽詢鶒㙳佤㔮馂⋐ጺ溁㶷㽐盠䄔杭懰ᆜ誢顡䦒ᗉ钠✓㛄湡橠衠膲ᖥ钠⡳㝅䃐䟮顠凹☬晴邡⛛湢铄䚒ڣ佤㔮䙑忱ᆈލ䩐爙ݡ貤㝠ᒵ㚃啄߇㽐绠䤔杲懰ᄼ誁塡齠因攴杭懰ቼ誡洄☳苠䴦䡈㙈䃐䜮顢䇙▴晰邡ᘻ湣瓄䜢ԋ佤䄮䙐忱ᖈል䩑㧹ԁ貢㥠㙐☺溂䷒ԛ狨㒀㖪䛃萨ᆎ墀杠䏩ቲ鶀យ滢橡⍄☋苠䔦䡏㙅䃐䢎顠懹ᖜ暄柟孱ᘃ䙁塠䝀䌘ᛀᄀተႪڈዡ㝀䏨鉤Ԁተቭ暰晲ԁ䙉◢⏀ተጭ暷晲ԁڜ鉥幡㙂▥⍠冠⚠㛀䂬ᐰݰႨ߆蚊虩Ұ晶屢穠湡ᖂ觀㭠ᘀ◠㝶ᄰڈݤဃ噴除晨䙅䅁䱀䩀桡㿰⡐ጠᖠ▻ބԄڂڹ繪㹂䙄㙅⻀睠㡀䝀䋀㜔屢ተႨݥԄ杰因㬔屢ᖐႨݥԄ蝰仠䔔屢ᯐႨݥԅႰ䛀䜔屢▰Ⴈݥԅ䝀琈鉤㩠ተႪڋበ冱繨嚠ᖠቴݷᖁ贃噰雠◠ᖨᄐ▤厦蚂Ⴀ㛀◰Ꭴ㙋䃍暤桠䝀㛠ᙐ䙋孻ݪᖀ桠䞀❐晬邖Ⴖ□ᖀ棠㧁ԕ竌ደ㙂□ᛀ䶂ރ伸ᗨ䙄㙂⠀畤ᅖ砐⚀晨䙄㩁䕈ᄍ䦠㠢ᖀ暊条引湨咄ᄴ○睥ဂ邂ᐠ発誀衠偭꒽㱈暀Ꮠᆐ扱艠ݡ幠㲀ᰀᇥ杰ᖀ衠䁏ዷҠ㙭ҥ湠橠紂㙩Ұ硦ԗҠ□亇⍂߁䩌ڮҠ㙂皬ⵄᆒ湸ߜҠ䙅䛔䃈ᓅ㙰ᇸҠ晪枀孰⍪䚠ᓰҡҵደ邀㑔朠⎀ҢԊᗁ窠䍩ᆀ㐀Ҥڔ◣仠抲ᒀ䇀Ҩᐨ㙖睨章ቺҫ㙂㚰ԍ䢀ڸ勠⡀ᄡ躦陠ብ陠苰乤㼾䥀䜨ݺ誠颠Ҳݠ⪨暀ቴݡᖡ䡀䞀■桺䙄㳀ቨ䛄ڴ⭀ᦉᔘҰ䕐ሐ擠㳤㒤㵀ڒበ䇁Ҩဈ䔀⥒⎲⦠ԉႠ㐀晤ڴ㕠ᦉᓹ᧠Ҵ曠⎀䙂Ԛᖀ驡ꊡ㙃盍㛸Ң湰ߜᦘᄀᔐሐ塠㳢ҡҤ䙌䙇ᄟ曰ڈበ睠孤㔨䡉山Ұ噉朰ቨᘄቤ暀Ң㙈Ҩ㙑Ꮙ▥⠚Ⴋ㙄湡◃鵲㚓盤◠␁һނڄڲҡ繪▤䙇㙀珠癠䡀恬ҩ窠Ұ㝐ሊڑԂ▩Ҡ☠䙇㩁䙀橠㳢Ҡ杘普䙀㙀胨暆蚈晰卤ጢԀᔐݨڤڲ晴Ҩ晢㙛㙂㚟迡癰㡁Ұ☠䙄䛀橴䪀ᗐ蹨勠㓂Ԗᄬݨငڃ噴癨普䙀䅁䩀橠驹ҳ仠◀䡠ቢ㙈စԉ晱■普乢湡䃈ݢᕢԙҠ晨邖ᄬݢ詡㩗ꄀ婨ᘀጠ㙄瞡▨㙒◀噤㲀⛡ݨ㪈曨眰◺ᖀ桢䙇䛀⻀筠䡀彠䬘ᠨዠᔐႭ暴ԂԚ⋀ᙔ䙉▱▢䛈በ徠⢠ᗄԀᔔވڍ䡀满黠㒀Ԁᘵ☢贠僠㝀䋠ᛀዢҰሊڑԂ㙒㩴⫴条㙅䍈栈㸶睨拠ᗀ⛀Ⴐݨᄉ堒㚃勤㺀Ԁᖵ◠䩀飠㬀☤㩆暀ᔔވڄ㜢ԙ䙊䙄䡑㛁曰ᖁ䡠䡨婠⋀䙈㙂㦁▤ԒҡԀ䚰䡃㙄□ᖀ桠梸鋨ᗀԀᖈ߈ڄԖ睨⭀◠Ꭻ㝂ᓀ䟀䛰聮墏Ҡ枈䜮䥰Ңᓀژ⚠ᘀጠᄀ▢◈洂㙑ԁᏀ邂ᇧ杰ᖁᖓ袨婤晠䙃孰橨Ⴄޒڙԁ㱶䡒䣆曰䙄㙰䁁ڀ癠Ԁ╘滠満㳢ڃ囨◠ዠᖶ☠澁皢ԁԉ㱚㕠ᇠ暺檀塠㝀氈桤杠㛂ߐᖀ桠馱Ҩ晨邍Ҡ■ᖀ洂蹠ሌ驠Ԁ⚰Ⴐ䙭䡠䡸婠㲀㑠ᣐҨႢԒҹԕ㑚ҫᯂᑈڤԄ⪤慠Ԁ呠ᣐݨႨ㹈鱠ڀ聠⤠⋐朠蹤Ⴂ晠ݠ䔢䡂䛀胨Ⴍ梀䝀☠㜘䡂䫆暨ݤބ终因䊀⤠ҰቤڤԔ⪛仨ᯚҫᯀ椨ڄڄ㗄嵠Ԁ呠ᣐᒑ䟠衠蝠䫀㺀⫠ᘥ洨杭塰蝠䋠ᠰዡᣐሊړԂ◱Ҥ橠䙈孰暣ҡ噠罠䋀㢬ᑄႰሐ嫠㳤▱繨ڀ␁葡䃐䙦蚀Ⴀ䍈⇮Ꮤݰሐ惱剠ᇰ⡀ጠ␁ݻލڄڲԚ⎰ᙔ屢詡□躒漌ҡ繫㹄䙇㙃盌ڍ䦠㭀ᘀ㒀␁象䃍暷ԂԙҽᔐᎪ䅁剠橠驹ҫ佦齷晠▾晢詡㩐☣■㲀ᗁݨ㻀ᅄҤ▨柨Ҷ㚚ҥ湡譠仠㝈ᘀ㒐ᏀႥ湠䩀硠因鋠㒐ᐤႢ㙈စԊҰ晼㲀⏈ᄪݡ▤ڲ晴晨䙎⤠ᔔށڀ橢ԙ䙊Ҥ㙇ᣐሐ擠⍂晰ұڀ⏈ᄘᖁ蟄ڴ⪠ᦈ癤Ҥ䙐ሊڏ杠庹ҽᔠᎪ㡀ᕂ躒潼Ңᘉᓱ㠀ҨⳀᅄڂڒ╢䇀Ұ㳀ᑦڠ䙷鹳黬ݢ㚫㝃⚠ڈԄҲҩڀԍڄڑ䛈በᅈᇰ䁈䙀㫁晨构Ԋ遰㑙麤⠠ᘭᓀ䟀䛰虰勠ڀ⠷ᆀ□橠ᖜ虣仨㒬ቬ㙀㚂ⵄ䛂ҩҨ晬杬孨ݨ߄Ԕ◣睦Ⴁꊧ廰ߐ䥎涂Һᖡ鋣သᇸ湠躃┇㧑繨㙄暀Ҷ暂Ԉ皤ႠޔߘⳄ㙀⡀虤䛔㝃雨㪀⛺⋀楠柁暀罠ݠ㪮ᒀ㙃□贠䜂ځҹተ邡ተᆐ䟍䝀㝀ݠ◠ᛐ㕐Ұ䙆蚀杠Ⴄڴڬ㙃盍㛸Ң湰ߜᖀ䙇䛄䃐巰艠ᄨ■鑤Ԁᔠ橺溘溼ҡ䩈ڮበ㙃皦ⵈ䌈呠ބᖀ嵢ҰҨҨ䗀ᓑ䙈ڄᇭ䝁蟭蛀በᄠ➀桤䙆㙃珠柤ݢұҤ晬杬孨ݨҨ㙃癤䙄晬杰孲ң蟈㻘瑠Ⴄ壣䫉虠ᖌ䙁婾䩮ҡጠ柴櫀Ҥ⋀ޔ⫤㥀ݢ䚁碢噠ቦ晠苈䩈⚞Ꮎ㟀㚄⺤䚒䙀⚠ᘀጠᄀݰڈԄҲႧҠ条◈满ݨበ偶Ҡ鑤ᖠᏐႭ暠በ偮Ҡ䚄䙅㩁Ҩ朤ڒ晰䛈㔔䡄䝀㐀Ҥڄ◣佨ڮҠ㙂㚄ⵈ䙃幠ݠ☢㺪䝀㐀Ҥڄ⚣佨ڮҠ㙂㚊ⵈ䙃幠ݠ☢囊䝀㐀Ҥڄ➃佨ڮҠ㙂湡躈⍒㙡繨㙄暀ᇠ隠➠橢ҩ婡繺ᒠݴ朠ᗁበ䎪▮Ⲹ䡉㙄㭃䛄Ҳډ艬ڀកހ饠ⵄ䚃噰因Ꮒ☊㙁■詠穰覰晨晪乢ᖑݰ䨩眰你㫠ᖀ䝂㙀橥䩀䡀⛠⛐橦杸恰ߐ䝎橸ᖇ陽襄䙃䛄䏐噿蚗⚠Ⳅ坌飒䅀ҨڄҴ㓀ᇨ癤Ԃᇠ汽ᖀ婰樂ᯂሸ┑彰ߐ䝎詸▐㐄晦杸憙䋍晠桠㝀ᛇ习邈Ⴀ☠躃␂Һᖡ軣ݠꔃ芼橠婰樒ᯃꊦ鞀ᇠ汽璮䦠ځҨ晢核ԕ⠀晤䙴♣盠⋂☔䜀䙿ဎ㵢Һᖡ鋣သᇸ湠躃┇㧑繠㺀ዠހ鵠ⵅԀႰⳄ坈䙃䛄䍐噰㘀懫滠⋂☖䜀无钄Ԕ♣耩諌Ұ㙁■亜Ҧ瞠■橦杸恰ߐ䝎橸ᖇ陽襄䙃䛄䏐噿蚗⚠Ⳅ坌飒䅀ᛈڄҴ㕠ᇨ癤Ԃᇠ汽ᖀ婰樂ᯂሸ┑彰ߐ䝎詸▐㐄晦杸憙䋍晣በ㝀ᛇ癠邈Ⴀ☠溃␂Ҳᖡ軣ݠꔃ芼橠䩐樒ᯃꊦ鞀ᄀ汽璮䦠ခҥበ屢ᖐڐ晦隐Ⴀ㝆轫晠㫁ҭ蚠በ䡈䟩ᓹ᧠Ҵ曠⎀䙂Ԃᗁ竣櫥虠⡀晦隀Ⴀᛄڴڬ㙂㚆ⵈ䌈呠ބᖀ嵢Ҧڂ詠桠䂈婴晬䙂㙁橮ᓁ塠侠◀橤柟䱆枨ޅԀႨ㙉ڀጥዠ㚀䩠詰⚠㛀ᖠ幺ᯀ椨ڈ㙑Ꮙ▹⠚⏀ᒐႨڂᔂ◙Ҩ桦ᓀ㙂□ᦀҤ❓獈Ҡ䙄䛀胨䛄Ԕ⪛仨ᯚҫ㙁㞃䙈㙂◀Ⳁ晨䙇孱߈ڥ癠ቮ陡賔Ҡ㙁□◀㳢㙢䉴Ҷ⤠ݶ晻ᇠ顠⛨⪠橰䙅㩁ቨ曕窀䉳雨㢀◴⋄□䭀䚂◙Ҵ癤ԁተڈᄆ隐Ⴀ㫀Ꮓ牠孻ݠᖀ㩐榱Ұ晦䙅□■ᖀ㩟Ҡ杀橠杠䍀䡀䩀ᖘ䙋仠ᗬበ㙀㚠ԍ䡀㟰■晠䙆䅁䕈Ҩ䗀ᓑҬ鉤ԀԀꎠⵄڳ噰ݠڀᖶᄘ□亂⍂䙀抍ᔀځݨ㻀ᅈ㺈䱀Ⴄ曣䫄虠ᖍҡ婸犮ҡዲ栄歀Ҥᰀޔ⚡ҩᒉ♠Ҩ⥀ᅈ㺈屠Ⴄ監㫇虠ᖍҡ坥癠勠ᘂႰ坠ᑐ困牠ቩႦ潩晠►Ң躑㻜Ңᗥᓉ➀Ҩ⬀ᅐ䚰◓ꌠԀ貂ҰҤ⩄䙡ᒙᖄᘀጠ㙀ᖗ蠀በᄠ■桦ጠ㙀ᖕ輀橢ұҭ窢ዠҰ߄⭄䙄㗤饠ڐበ䧆暨ԅԀ䡈㐅ቦ浭ᄀꇇ㹀በ㟰■晠䙂㙀橱桁塠㝀㇉ዠ邁Ҧݢ詠婸Ҳ扱ڀҰ⭆ڂ詠ᖐ覱䙈ڄᖠԀ桺歠䙂㙪䉑ڀកቻݣᖀ桠倐◀㹂⥁钬陠◛濼ҡ䙈ݢꔠᇠ朽畎㦠㙀剩ڀႰ俢㙈ҤԂҨ杸㹂⤂䙠ꔧ㹀Ꮐ㙁ҥ㑈暀ހꏇ㹀Ꮐ㙂䉴Ꮓ髼虠■⍠䙄㖤饠ݣ鋼虠⠀晤Ԇ睰ᙘᖀ䙀㙀橲衁婿歆Ҡ晠屢Ԁꋇ㹀ᖟᚦҠ癤Ԁᄕ☠䴀䙂ҡҥቢ颖Ⴂ㚽㧘Ң晰ݠݬᗀ䜶䵰Ҩ㙃噰Ⴇ辙晠䛀⻀晡婹䬮Ҡ癤Ԁއ榠満Ⴆ佰Ⴄ㙠犁ހ歰䝂ᙂ►ᗁተ㚌㛁㚄◁Ⴄ蝨㝇鞙晠㩁ұ䟠䡀Ⴀᦌ晦醀ᄕ盞䘯崄⨻步ꅴ䡀䛀□◀䶆罰ᘀڀᄩ㇂榠満Ⴆ佰Ⴄ㙠犁ހ歰䝂ᙂ▲ᗁተ㚌㛂㚀ڈᖟᚦҠ癤ԂᏐႨڄҲң吉窤ጭ⋀㚾㧘Ң晰ݤᏃᘝ虠◠ڈԔႠހᖀ䙁䳂㙈ҢᣒҪ劔ᖖ䙀㩁ቨ晡癠聨ݤҶ䙀◐ᓀᖀᖐ覱䙈Ԕ⪠ᦀ晤ᑭ嫐蹲╢忠ԈႠ㚥㧸Ң晰ᄔ䁄柴畀Ұ噆蚀ڸ勠ዠ蒂ᆐݺ檀䙤ႠⳆҤ畤䙐ڄᒡ晰罠ᛄ㼔乢ұႨԈ㛆瞠■橢浤䙐ڈݦ蚀蝠㛀Ꭼቨᯀ椰懳䉀ቮ飇Ҡ乢Ԁ藨ڨ㙷娛欸ᖀ⤠Ұݤ✄Ҥ㗤饠ڐበ䧆晰揳牠Ⴀ♸ᖀ㕋㙁㚠ډ隤Ⴀݠᖠ㺁璮陠◓瀼ҡ䙈ݢ꜊㝀⻀晤Ҡ蹨暼婾⤠ᄀ朽檠婰䇢┲姠ڪ㛀替躛濼ҡ䙈ڄጡݰߝᗀ嵰䡁Ҥ癤▬ݥ盗㥸Ңұҭ諌በ㙀椨䚤Ҳҡ繨㚀ᒠһݣᖀበ❐◐晠䙃䅁ቢ蟙䚰▻ꌬݢ曊㝁⚠ᖀበᄠ■橨条孱ߍ暠ԄҲݠᴀᗏዠ■躘Ҥ终ᘀڀᗪ䛂䃐噠㧠Ң⎠ڀԈႠ☠鏄䚄◢䩑ڀᓁ蛠㨃䚤Ҥ◃仠⍴䙄▿■◀ᓠ㙁Ҥ癤ԀႰҪڀ梀⠈蠰晢杨悀蚀䗀鵷㝀ᛄ㜬柠ꙁ芨Ԉ㟇姳漸ᖀ䙂㙀㚂ⵅԀႰᛄ坈䙁䛄䍐噰㘀懫滠Ꮒ☖䜀无钄Ҵ♣耩諌ቤ㙁■◁洂晰ݨᏂ㺴㙀皢㓈㹈▀䐅誠ᄡᖻ㚠䘀嵲Ҫᗡ鍄颖Ⴄ■橠ᖑᓑ䙈ڄᄡ⫺■亁␄⪤ᕰ㔢颀ހ桽源㘠䇉ҥደ鳒彻ݣᖀ䡀ቨ砈癤Ԃހ汽ᖀ㩐樂ᯂሸ┑彰ڐ䝎詸▐㐄晢杸憙䋍暢በ㝀Ⴄ圴乢ұڐ䥎桠⠈䠑ᒁလᔸ苨Ԉ㛇塬ᕸ⎂䙁䛌䏜璦蚁䝀☠ݢ䊪㩁Ҩ暈㟇䝀ᛄ㜨柠曞ሜ咤Ҵ◣罦ሼᓱ㙀皦㔎䵣噰蛠ᗀځ㙵⠀晤䙔♣盠Ꮒ☔䜀䙿ဎ㵢Ҫᖡ鋣သᇸ湠亃┇㧑繨庠ዠԀ潺歠䙂㙊ᗡ躠ᄡᖺ㚠㙟曗⦱ҥተ鲡曟ߜ䩀㩑樓瀨鉤䙠ႰҰ䭍䣀㙁▥ደ骀ހ桽◐▯蚛氨晢杨憀蚟曎㡀⠈蠹譄屢㡐ݨҨ㤆瞠■橢杸恰ڐ䝎橸ᖇ陽襄䙁䛄䏐噿蚗⚠ᛄ坌飒䅁⠈ڄҤ✣伀ᖀ䡁䛌䍈Ԉ㛇䡌ባ鹮韒㙀皢㔈㹏陻櫠Ꮒ㺶徙⻀毤ԂҢᙑ窰በ㝀皦㓄Ҵ◣睦Ⴁꊧ弙■亁┄⪧鹭袠ᄡ⫻䋜洠䥂ұҡᎰ邈Ⴀ☠亃␂Ҫᖡ軣ݠꔃ芼橠㩐樒ᯃꊦ鞀ހ汽璮䦠㟡Ҩ晠果孴ݠᗀ㩑樁ҥተ骡暠敡钎䡀⠈䠙ᒁꔃ廰ڐ䥎趇㟰⚀晤䙀䛠䄊ڀዠ⠈蠰晢杨悀蚀䗀鵷㝀ᛄ㜬柠ꙁ芨Ԉ㟇姳漸ᗸ䙂■■ᛀ䙂▸卤隠ᓉዠ㚱㝸Ҥ⛢⍲㧀Ұ䁀ᑈҤԖ硨㟩Ꮀ䙃寨㗈Ҩ㧃噰ݠᘂ曋㡀ᕂ躏顠䁍碇Ҡ㙮ҥ湠躘Ҥ㇄䵀Ԁ占ᦀ鞂幠ᖒ桭碇Ҡ㙴ҥ赡蚁乒ҡ䙈䚂ᒂ䙁㙀湤Ң晰䛈㻂ᄧዠ■躀㪠蹨噬㲀ᓁރ榠䞤Ҳҳ令ᯄ晢䙐Ұ䣍䣀㙁◁⠈暀ݰ杣ԁ塠⚨㙍ڀᒠቱሑ栀䡀恨ᦈ桨ጠ㙃煠Ҥ䚤⪚五ڀᴁ꜠芨䝠乒ҹұ⪨暡Ұ棨ڡ晰罠䋴Ң枟廰棨ဈ㙦睰㙬桬䙉䜰ڒ䟠ԇ齠⭀⭌ᗀ䛀◢詠圠◹Ҹ聠ځ䗸溢詠詰⥑▰㲂ᰀᘠꊠ侁癢ҹҹ⪨ꛁҢ湡満㳢◁Ҹ聠ځ䗸椨ᄈ㝧䡌ባ虠鞀ក楽㒄ޔ◓砩諣ݠ衠㟃䚡塠䝀䏬晪邁Ꮠተ噍䡠曈Ԍ㲀ᒠዣᓀڈበ䞠Ҡ橮柟䭆晠癄ԒԂᖅ竬ᗀ㙁溢◀߀◹ұቤ邁ᖐႫ䙀㩓ꈪᖙ蹶䙇䜿暼亜Ҵ滈ҩꕀᒠᖣႰᖀ塰塨Ԑቶ䙈䛀胨䜄ݢ蹠Ⴄꗢ⤠ᔠꞀ咈䕀⡈婠普桟ޘ溡钤㚂ҹҹ⪨ꛁҢ湡氀Ҥ➻檌普杲悀蚀䑀⎲Ԃᖙ轄颡暠坠♡癰繲ݠ⢊䙂㙂矼漀橤□ᖌ晪䙂䷦暨Ԅږ矀ҡᏀ湭ݥ湠䩠園ԉҨ晦䅡Ⴐ߈Ԅԑ罨ᖬ晸条䥆晣ԁ嚄Ⴀ▱ݢԁተݨ䛤Ҳ▸Ⳁ晨䙃㳀Ұ幠㵔⪠ᛙ窢ᖠᇠ暺檀塠偫ꑈ橪Ⳁᣐݨݭ塠ᄠ◐橬畭ᄀ晨䛄Ԃ◉Ҥ桦ᓀ㙂■谀Ҥ㑀᧥ᒀᄦ孰杨ڨ㙖睨⭀⢂꜊㝂榠ᅁ晰聨ݤ◠ԈႦ☡栀߀◺ᖀ桦䙄㙁䄈ߍ䡠䝈㩉Ҥ晢䙠晨ҥ癢Ⴐ㻀⭂ᓆ㇀朼亀㳰陸ᖀቤ⤠ዠ暽檀塠䡈ᦉቢ鲁Ꮖڂ躀ተ你㛄ᯖ䙃䛀胨䚠乐㡀Ⳁ晦柟孱߁▤Ң晰蛠ڐቤ㙀⠀槥ԁݨᖁ⠚ႬႥ椨ҥԀ䝈㝄ጠԈႬ■䩀䡀ᄠ☐癤⪱በᓀ䦄ڔ▫令ᴀԈႮ◠䩀Ꮐ㜁ᖀ⋀䙃䛿胨曈皤ቨԜ㲀ԀተڊڂႰ▢㩴Ҷ⥁ݥ樢詠Ꮐ㜁Ҥ晤䙀䛎䃊ڀᏀ㚠橰ҷ赥ݡ䘈虨䑀ᓙ▬湠䙃䜠ҭ暠桠㽀ᘠҠ䡂䛌䍈ڈ㛇䡌ባ鹮韒㙁㚂㔈㹏陻櫠ᘂ㺶徙⻀橤Ԓҩ䙀◤ጡ⫺■溁␄⪤ᕰ㔢颀ᄀ桽源㘠䇉ҩደ鳒彻ݩᖀ塠⛠Ԁ橤杸恰ݰ䝎橸ᖇ陽襄䙂䛄䏐噿蚗⚠⚤坌飒䅁⠈ڤҲ晠囨ᘂ㺴㙁㚂㓈㹈▀䐅誠ጡᖻ㚠䘀嵲Ҳᗡ鍄颖Ⴖ■詠㣀ݡ▩ደ骀ᄀ桽◐▯蚛氨晤杨憀蚟曎㡀㡈蠹譄屢㹐߈ԅҡ䝐⚤坈䙂䛄䍐噰㘀懫滠ᘂ☖䜀无钄Ԅ♣耩諌ዴ㙁湠䭀ᆂ㙒ᗡ躠ጡᖺ㚠㙟曗⦱ҩተ鲡曟ߜ䩀䩑樓瀨鉤庀ᆐڊң梀㡈蠰晤杨悀蚀䗀鵷㝀⚤㜬柠ꙁ芨ڈ㟇姳漸ᗸ䙃㙀灠ᖄ䙤♣盠ᘂ☔䜀䙿ဎ㵢Ҳᖡ鋣သᇸ湠溃┇㧑繩ڀᒠݴҩᗀ䩑樁ҩተ骡暠敡钎䡀㡈䠙ᒁꔃ廰ݰ䥎趇㟰⚰晦䙁㩀⠈暨㟇䝀⚤㜨柠曞ሜ咤Ԅ◣罦ሼᓱ㙁㚆㔎䵣噲䛀ᴀᄈҶ☠溃␂Ҳᖡ軣ݠꔃ芼橠䩐樒ᯃꊦ鞀ᄀ汽璮䦠㢡Ҭ晢习㹑ݰ䥎桠㡈䠑ᒁလᔸ苨ڈ㛇塬ᕸ⎂䙂䛌䏜璦蚅Ⴀ⭀ጰԔ㝁㚆㓄Ԅ◣睦Ⴁꊧ弙■溁┄⪧鹭袠ጡ⫻䋜洠䮂ҹҤ癠庂ᄀ汽ᖀ䩐樂ᯂሸ┑彰ݰ䝎詸▐㐄晤杸憙䋍暫በ㽀ᘠڸ䡁䛌䍈Ԉ㛇䡌ባ鹮韒㙀皢㔈㹏陻櫠Ꮒ㺶徙⻀燤ҢҺᘁ窀Ԁᇠ鹠ⵄ晠藰㹄Ⲿጠᄀݰᖀ䩐烘㝀晦䙂▩滠栀㩐ڸ卤ڂጡҨ㾈暄Ҵ◠枑糢㪁ᖈ㥚躂ᖐ曢堍ᕱꜛ宀萼亏紂㙊ᖁዠ杨◆㚀瓭墀䝀ᘀ☲䅠ᇦ榠亂በ䁈㟩ዠ杨◆㚞鎤Ԕ缺ᖠ䛘䝆㙀ᖙ檠㡀☢黨⠠要ቡ㙀湠䩀㡀⚠ᘀጠᄀ■䡊骰䡁Ҵ晬畭ݰႰ敳牠ᄠ□⪺ዠዠꏇ㹀Ꮐ㙂㹴ᴀᖐ俦桨ݢᨢ㙹ҵ窤◀ᒤ榢ᖁበ妹ᖔ普柠ᄄ榡ᖀ条滀㩬晢㚞㛂湡源Ԅ滈䋀⡀ᴁድ㨁▤Ҳ◁Ҵ晬醡朠ቲ䟠霒ҩ䙈ڄ⏀ᐵ㚄ⵄ㛂Ԓᗽ竣ݠቨ㥈䛨㙂㙲㩴㒀ᰀᔵ☡ᖀ硠憹▽ᑠ邂ᘛݡᖀ桠滣Ⳅ㒬ቤ㙂□躎洁ᒚᖀ鉤ᗁꕎ噠◟瀬ҡ䙈ڀកᖵ胨朆蚀ቬ裗Ҡ柸畀Ҫڀዠ彠㻀⬀␋⻛ݠ◐➜Ңᯂ懠ԈႠ☡橠硠坠㭬峌በᯃᑈԄ㚂ԉҹ粤ᠡ◀桤✩㜐你ᘀ⫠要ተڈ߂ᕲԁҴ䚾䙄㙂橤ᆀ朔㗄饠ڐበ㙂胨朄ڤ軈㫀ጠᯐ埰杨ԄڡሹҰ晪䙆寱ᆐ䙮䦠㙢╢忠Ԁᒛݠ◟➌ҡҰ鉤Ҭᆅ盛㧘Ң晰ݠ⣔䡄㙃㢃䛀䩂ԁҹ粤ᠡ◀桤✩㚄Ⴀᘀ◀斡Ұ枰䙄㚀虨勠ጠᯐ埱Ⴈނᰒ◙Ҥ晬㙿㙂□䡉塠彠䋠ᖈ柞廻ݡᅈ䖉豠ݠ☌በ䜶䵰Ҥړ噰Ԑᖖ䙄䛆䃊ڀዠ潠㝄㜔乢ұႱ蛨በ䝀䬘ᖘ䙉㙂⻀条晰聮飇Ҡ格獀Ҫڀᖗ靠䍄⎌鷑䅁Ң詠穱ቨ䚁㻞ᗀ㙀湡桬塰䝀ᘀ⫠斀ተᄤ▄ڂԈ暠㹂⤠ݰቤ▁塠⚨㙬晨ⳃᣐ߄Ԅ䚄仈ᘀ◠Ԁᆐڄ⩈㷄⪁Ҥ䛮䆪㝀湠䩀嬑绡蛠Ԁ⎯ᣐݨҤԒҩҤ晦煻▼⋈Ңڰ罠◜㲀ᖐ凭□ቬ眞䙰ᖍꕆځ蹠䄈构晠㡀⚠ᘀጠᄀݰڈᖐ聨ᗁ䢄⠄䙐Ꮠ䜭䩘扦Ҡ癠ԖҠ▢源▬ҡ䩀ڮҠᄀ□満涤⚙ҵ甶䡋䜿暼俀橢Ԑ婥ᓡ߀Ԁ沰婰⪠ݡ癠㳂⛡ݨ㪈月眰㝀㭆㵁晠㫀ҭ虠በ偨䟩ᒧ߀Ҷ晠␀Ҡ蚘剩ݥ束ꡟꞀ詠鄴㙼䁀景厺ዠ▢●鬠躀⚠晰此䙠暨䛡晰罠䝄ዠ瞂ᐢ榡柄ݴ□繨㚀⛀ᖛݡᖁ㡀倐■晲杠㙄ᖈ䩁ڄႠ䫠ᖐ䡅㙄灠晭䡀曡黠㢀កᖵ⻀条塠灨栈晶䙆㙃橧蚨በ㡈᧤䁀䙉䜁䙱Ҧ蚂Ⴀ䭈ᗮᓀ㙄湠洠䨂ډҤ鉤庀ᘐጰ䩍䦠㢁ԅጰ邀ᘠ瑺桢㡀澠♐桬䙉㩁⠈䛤ݲ晱Ⴆᛁ橠䥆曨߈眰Ⴀ㪀㑖䙉䞅蚀㙖ҳ幱因㢀⠶Ⴔᒁ蟈㛔▨枤橪歭Ꮠᄰ徐⪠ᄨҠ鑠Ԁᐠ桺溚㹌ҡ婠ڴҠᯃ椠湠䩂Ԃᖅ衺Ԁᘔݬᖡ塠灬⠃■屢㙐ጰ暦隔Ⴀ䫀☌ዼ㙄湠贠䧂ډԅጠ邖ᄄ▢亅⍂ڊᚡ窀㝠ᘔݫᖡበ澠♀桮䙉㩁▰嚰⬀ደ婤晰歭Ұሄခ塠灴呢Ⴁ噡䇁⤈ᄄރ噱䛀⭊Ⳇ㙂橡蟠蜒ԉԌ普䙉㩁⪨ᄈ㝆睠䫠ᖀ䙉㩁ቤݤݴ⠃勠㢐ቨ䅁Ҩᄄݲ湸ߜ⇰䙉䛔䃈ᄈ㧆盡勠㙈暀ᔈሂ詠蚤Ⴀ㪀㑖䙊▣楡蟈㛴▨柨Ҷ杩䛀橸晡坥癠勠㛂Ⴐ坠ᑐ䝨㙑ᒐԌ晲乢ዢ榠䩁㣀㙀晼㹂⤠ᘠ梭暥桠潠㬘ᗐ䙉䛄珠汤ށԘ勠▨暀ᆈሂ詠䚄Ⴀᗀ㑖䙉㩁⠈䙠䩀㡁Ԅ癤劂Ⴐጪچዠ䂨㝀晢䝂ᯀ椨ڨ皤ቨᘄᗀႰᔆڂ詠㡀㡈ᘀᰀ玂ᄂ榠䞤Ңҹ繨◠ԀႻݠᖁ㩝ң仰Ҿ⤠ᇠ暤⬀ޛ◈ᖝꖂ冡暠坠ᖀᏀ㙁◅ቢ鞂Ꮝ溢橠桠冱ᖠᘀ䙉䛂䊑䛈ᖐႨᖰቶ䙂ዠ■檀衠⚨㩍ڀ⏀Ꮦ晠◘ҷ⠌ҥⲔ䝇㙂皠厤㚒Ԓᨽ窤ᯍҥ椨ڄݦ睠䏬桰⤂䙁㙈ҥԀ桨ᛜ☠䙀㙅■䩀䝃㺨ᖰᖖ䙀䛆䃊ڀዠ坠䝴☠䙀㙅■䩀䝃㺨ᖰᖖጠᄀݰڈበ灨䠄☠䙀㩁Ⴈ䝤Ҥ✡繨◠ԍҰ◢詠ᖐ➐ݠ晠䙊㙀湠桦地偨ݤ⡀ᰀᖵ滠䩠䩐⚠ޔڀ䡆㙃㚀輣婰䇊ᖅ籼ᒂݡ߂躀ተ你㻀㜖䡆㛄ݰڈԄቨᘀښԀ㝃湡躀嫁聨㐅ቢ酮ᆀ晠䚁塠塨᧸桪䙆䛀胰䙮衰曀ᖭበ䝈㙃◡䞤ڔ▫令⠆暀ᐠ蘺檠窰躁Ҡ癤㹠ҴݡᖀᏀ㜡䙈䙢Ⴀ䣆晢躀㜰罠ᛄᑬ䝅㙀皠厨㙗坨◐ቶ杠㛁■䩠眒Ԋᖅ窢ᛂ䙁癨ވ㸶睰㭔䁂䙀㩁ᯈҥԀ䝀ހᖸ乢▨暠♁癠聨ᖼ㲀ԈႢ◠䩀Ꮐ㜁Ҭ晨䙀㩁⎪ځ杰䙀婤晤条孰栨ҥԁ蝨☠ڐቸ㛁朰ᖀ驷ꇱ▼☠䙃㙀湠歠䝁▨Ⴔ䁂⪣ᣅ湠ᖁ娀ႡҠ晲屢ዠ晣蟄Ң晰㛄⡀Ԁᛐڈڂᒰ蹡Ҡ癤㹠ᆐႨҥԁ螠◐䡈ҭҰተ䙭䡐彠ހᖸ䝁㙀⠀楤㙀䁁ҽᑾ邂ᔢ杰◀တ罠ݠ⡀ᄈႨᗀ䙈眰ژ卤ቾ⤠Ҵݦᖀ塠䝀Ⴄ弴乢Ҵݣዠ晠萠㩄㬾䥀䛘䄈暤晢Ҳᘑ竣䫓虠⻀晤Ԅ▹蹠皠ጢ暠䙠㙀槐㺁Ҩ晠屢㙐ݰ䙆蚁杠⚤ڬተᄟ曰ڈԄႠᘠᖐ䡃ዠ■䭀䙂◉Ҥ癤ᖢᖐڐ䟍䣀㙁▰晨䙈䯍满♁癲ҡҴ癤ԀᏔݡ◖⛜ҡ䙈Ԃᖀ⋁湡亁洂□Ҥ癤㙡ᔐႨ䝠婢ұҭዸ邍Ҡ㓀ᛄԂҺᖑ窲በ䝐䢍蛁በ䁈蠈癤ԁᒠ晨䞈㙂▨⚠ᘀጠ㙁皥ⵅԀቨᦌ䉄Ңݥ湡満嶢ԛ仨㲐ቤ䛋㠃䙤ޒ晰ހᖀ䝆ᦀ暨䙡塠㝀㼘ᖨ䙂㙀珠桤Ԕ☣伀ᖀ䝁ᄀݰڈበ䁈堈癤ځޕ槠晠䙐罠ᛄ⎈䙇孱ᆊڀ橱墘婤晬乢Ҵݠᖠ㛴▩ᖨ㲀ዠݻݧᖀ䡀砐☀普䙃㩁Ұ䚮洂㙉䙈ڀጡᖵ■䭀䚁▨Ԕ◠⛡昕☢企皒Һᘁ窢ᒠԀ蕺檀㡀ᄠ■桬䙀䛄䃈䙄Ԃ晱ݠጰበ㙃■歠䢂晰嚤■歭ҥ楠蟄Ҳ晰ݤ⡀ᄈႢ☢ᖀ㩑䦑䙈ڄᖠተቲ规䚄仈ݠጰተ㛁湠ᖀ磠㙁Ҵ癤ᗁ纩陠ᛀ䙁◀Ԕᗀᠡᰕ◠ᖀ桰►ݠᴐበ㙁㚂ⵄԔ◃伀ᖀ㝁Ҧ木Ԉ㸶睰ᛔ䁄䙃䛄䃈䚤Ҥ⪃令㢀ԈႠ◡詠ᖐ榱ᖀ晤乢㙐ጪڀበ彠♀ᗈ乢ᯈ杠♁癠绀◍በ䝄ᣐቨݩ嚤Ⴀ♀ᗀ䙅㙂㚀铭䡠ᄠ■晠乢ተݪڄ棠㚠橰ҺႫ䛀ᒀ䞨㙐罠⚤蜴䩀᧹杠䙯顠ݠ穩Ҥ晢䙁㙀湠䩀㡁ҩቦ煤䙐ڈҥԄ蝰Ⳅ坈䙃䛄䍐噰㘀懫滠⋂☖䜀无钄Ԕ♣耩諌Ҡ㙁㚁送癲ҩҡᔠڪ㩁Ҩ曈㟇䝀Ⳅ㜨柠曞ሜ咤Ԕ◣罦ሼᓱ㙁皦㔎䵣噠㛀ᘂ⥍⋁■䩀ᖝ䙃伀ᖀ䡃䛌䍈ڨ㛇䡌ባ鹮韒㙁皢㔈㹏陻櫠⋂㺶徙⻀ႤԄ☚媔ᴀᄀԀ鱠ⵅԀႰⳄ坈䙃䛄䍐噰㘀懫滠⋂☖䜀无钄Ԕ♣耩諌Ҭ㙁㚄送皢ҩҡᔸڪ㩁Ҩ曈㟇䝀Ⳅ㜨柠曞ሜ咤Ԕ◣罦ሼᓱ㙁皦㔎䵣噠曠ᘂ㶍⋂湠䩀ᖞң伀ᖀ䡃䛌䍈ڨ㛇䡌ባ鹮韒㙁皢㔈㹏陻櫠⋂㺶徙⻀ᏄԄ♺媔⬀ᄀԀ齠ⵅԀႰⳄ坈䙃䛄䍐噰㘀懫滠⋂☖䜀无钄Ԕ♣耩諌Ҹ㙁㚇送盒ҩҡᕐڪ㩁Ҩ晨㟇䝀Ⴄ㜨柠曞ሜ咤Ҥ◣罦ሼᓱ㙀㚆㔎䵣噠障㳂ᖠᄀ鎁㹀Ⴂ蹠卤㚀ጡ袢噠ብ癠聨因ᘃ竤虠ᖋ䙁婱Ⴀ⚧潩晠▶晢躂桠㡏硳Ҡ㙭ҥ皦ᖀ䩘䩮Ҡ䚚ҫ䛎■溒溼Ҡ朔Ҷ枀㙁㚩㛸ҡᅈԏ䁈Ⴄ旰ҨԂᰒ▰⚠ᘀ䙀●榠ᖀᏀ㙁ᖌᘀ䙀○瞡▤Ҳһ令ጠԀᆈ㽈晨䖉豠ހᖀ浭ݰݪڀ橰䇊ᖍ㑚ጡ鲮噠ᖀ㦠㙁Ҡ晢䙂◃ᕂ詠㡀䆒ᗁ窢ҬႥ湠躐Ԅ麂ݠԀ㽌ݥ湠◁洂晰ݨ◠ځᖵ⠀晤䚔庂ݠ⡀ᖶႦ□ᖀ秀㚀噤㳃苹虠㚷㥸Ң晰Ⴅꋠᓁᇻ䐜䴀䙀繲ݠᖠ祤䙐ҨԄԁደ噤㱄暡ꋮ噠ᛀ䙂Ҳ䉑ڀጡꃮ噠ᛀ䙄廈ᛇ辙晠㙀⻀晨䔉豠Ⴇ羙晠㩁Ҩԍ䡠❐■晠䙁◅樢躟➌ҡҠ鉤ځ麮噠◞➌ҡ䙈ڀᅊ㝀珠晤ҢҪᖅ諌ቤ㙀㚽㧘Ң晰Ⴜ䁄桌瓀Ұ䙆蚀ቯ磓Ҡ杠䅁ң蟄ԁᑱ▬晢邁ݡ㙈ڨ㹀㢸㝀晤㙙ᯀ椨ڈ㜆瞠■橨䙂䛄䃊ڀዠ㡸㝀晤䙄䅁ᒈݤԃ噰䙰ቶ格獀Ұ懳䉀ᄠ□ᑼ䙃䛁菽钆蚀ڙҠ晢㚋㙀㚽㧘Ң晰Ⴜ䁀桌瓀ҨԆ蚀ڸ勠ᏃҢ䷢㙈Ҥұ߀抌晢杣慱ݰ䚮橾䬎ҡ窢Ⴂ昀鶆幠Ꮐ㙁▭ቢ䙂恱ݼ䛈በ⛠◀㹂⥁钬陠ᖀ䡀䇑繨ڀႫ㛁■䩀ᓠ㚁Ҩ晠屢ᯐҨԆ蚀蝠ݠᗬቨᣅ財Ԁ幒㹂┠ߖ䡂㡀■溅⍂Ҫᗁ窰በ㝁珠晤Ԅ⚣仠Ꮒ☊㫁ҭ蛀በ㝀ᘤᖀ嵣⪰ݨڦ蚄Ⴀ⚤䜔䙂䛌䃈ڈ㩆绠驩Ҥ晢䙁㙈څ癡Ⴐᛄᘌ䙁䛀花咨皤Ⴀ♔Ԃ䝃ᄀ■歠䣂晰Ⴆᛁ橠䧆晨څԁ袈婠晤乢㙢榠蟈㙔▨枤橢歭ᆐڈڧ䙀Ⴀ⚪ᒁݠ▻曭ᖀ䡀❐♠晤栰ԕ■溅⍂晰ݨᎬበ㙁㚲ҭ䡀㡉ᇨ硦ԗᆀ■橠䣐㼁艭ڀዠݻݵᖀ䩐榱ҩᏀ醀ᄀ魠ⵂሐ㡁Ҩ聠◂ހ曱橠㩐⦪㰈䁀䙂㳀ጨ䛈㙒►ᖄ桢ᓀ㙀湠輠橠㡁Ҩ癤皈Ⴀ㚠癸晤廈ݠᗐጤ䣆晨څԄ梈媀㲀ጡ㹵■躀㝂◹Ҩ癤嚀ޕ□␀Ңұҥቢ邖Ⴜ■橠䣀㣁繩亠ዠᄀ発詠䩝䙃亠悠ይҠ☠亀䪢Ҫᖅ裪顭ݰݫ䙀㡐䝀♀ᗨ䝃㙁⠀浤㙐虠剠㲀ԀႴ本⎀䙂Ңᖡ窠ጡ䉵⠀晦蚀ڠᖬ晠杠䅁ቨҨ䙓幰Ԍ晤桀ԕ⚠ሡ婻ᖎҡዲ栀杀Ҥ⋀ޔ▪ᖄ䜄ҫ䜘䚰Ҩ㟔Ⳅ⎠Ԁ婠ᨬ߀䛏颐ቩᇬ橤䩀㙀⠀晤㚀㡀⚠ᘀጠᄀ■亐Ҵ麂ݠᘂԖႨ■亐Ⴄ滈ᘀᘂ㚪㛀■亐■䢈㝀晤䙁䛟芰噠㵣癠滠ᗀᄡᰛ㚸Ԏ䧠ݡҨ晢杦憀瘼亐ҷ㠐څቦ䝁ᯂ椨ڄҴ➻武Ң颚ҩ湠橠㩑㧲╠ᑤ恠▰ݨԈ㚧塩ꑥᒀᅒ䍀ᘈڄҴ☃罤ꗢ柠ޙ㓀የ㚂▨噰㲀ᖨႤ☠ᖀ橰䦑䙈ݮᗀ㙂⠀晤㙰虸勠ݢᅊ㝁湠⛁癲Ңᖅ躤កᆐᄨک堒㙚ᖠ晦杨䯍溠蚨በԂݠᘂ㺪䛀珠晤Ԃҡ繨亠ዠቴݠ⍠䝀虨勠ᘂԖႨᑈڄԒҲᗁ窀䭠ᄀ桺歠䙂□Ҩ癤ᖡᆐݪڀᖐ⠸㝀晨䙃䅁Ҩݨ㚆睠ߘᖀ䙄㩁ቨ䙁暐罠Ⴔ䁂䙃㙀ᖘ晡塠㝀ᛄꗢ柠ޙ㓀ዤԂҪᖙ鋣晡彽Ҥᖀ䩑ᓑᖁቤ䝁ᯁᑄ⥀ޒҡҭ窠ᄚҠ□ᖀ棠㚂ᖅ竌ቨᯀ椨ݤҢҡҥ窀䉋㙁㚈ⵄ晤■嗼ᖂᓿᄀ■亁㬰䡂ᗁተ㚌㙀礡▨㝄◠析桢⥁Ҩ㾈曄Ԕ◠枑糢㪁ᖈ㥚躂ᖐ曢堍ᕱꜛ宀萼亏紂㙚ᖁዠ杨◆㚀瓭墀㝀⭀ᘒ䅠ޕ湠❁癲Ҫᗀ晠杤宀橰䝂ᙄ⩛仠ݶ䆁ᖈ㥈曍䩑ቨ䚁㼔柜孨ڈ暨眰⚠◡犢Ң䙐ڐ噍䡠䝀➅⠈暀Ұ暣ԁ塠㝀㟩በ䙁尘橹檀䩑ቨ䚁㺂ᖠҨ㷈ڄҲҳ仠ᗀګ㙂㤆誠㡀ᓙ▩粢ᖠҨ㰑䛈በ⚠㚀ꕀԀႨ㘈Ҥԁݠ噤㲀ԈႠ◠ᖀ㡀䟰▰晢䙀㙁䃍暠ސ㡁Ҥ䛮Ⳁ㙀橷檠䩑ቨ䚁㺀ᓪ䳆晨Ԅԑᒙᖀ晢䙃▿湠ᖀ䡀䆙▬䚾䙀㙁橤ᅄұᒩҤ䛮䁏ᣐҤԄ㚀罠㙯㹄Ⴅ旰ݡ▤Ԕ◣令⪦晢旰Ҩԅ癠Ⴐ䍄⚌邌Ҡ☡亏鬠䡁Ҭ晬乢Ԁ曤ᖤԒ晰ݠ⬐በ孱Ⴈވ䉀⦪ᖙ鋣晡彽Ҡᖀ穳ꈪᯁꗤ䝅㙂㚀厤㚄▰噤㲀ᰈႠ☡ᖀ婰䦑䙈ݬᗿ㙁湡◀㝂⚠㻠ᖀកብ湠譠䙆睨㝄ቶ䝈㙂□䶀ҢԑҸ癤Ԁᖵ☡䴀䙂Ҫᖅ窢Ⴂ旰Ҩဈ㜷⥑噠ڄᗁ昆Ⴐ◀䡐彠⭀⢂ተ㛐ߊڀበ垠□窤កዠ陠咈㚧塮ҥ諔Ҡ㙂㚏针㹇ꈱᖐ晪条学ڂ躀㡐彠Ⳅ♴乢Ұᄱ曯顠㽀㭄ዠ䝠ᒔݠބڐ罠Ⰰᖀ遫㙂㓀Ҥڢԑ䙈ڀ┊䅁Ҩڈ㸶睰◔Ҷ⤋赡ڀ附噤☣勨ᴈҢ䙁㙀湠䩀㡁Ҡ聠銥ዠ■詠ᖜ虣伸ᖘ䙀䛄䃈ڨ㜆盠䛀ڀԈႤ☠亀洂㙑繨㚀ᄡ搅榠䩀䩜Ң劔ᗀԀޕ㚃ⵄҢ晰㛈Ꮒ㺴㙀皢㓈㹈▀䐅誠ᄡᖻ㚠䘀嵲Ҫᗡ鍄颖Ҡ■ᖀᏀ㚁▥ቨ邂Ⴛݢᖀ㩗肸婬晤栠ԅ榡ᖀበ⥒ᖱ窠ԈႠ☠亃␂Ҫᖡ軣ݠꔃ芼橠㩐樒ᯃꊦ鞀ހ汽璮䦠ҡҠ癤◡虠㠃䛤Ҥ□繨㚀ᒨႦ■◁洁ڑҡቢ恠履湠躂⍂䙀抌晢䙂䜚䢰Ңᑠڙҩᔀځ肤陠ብ癠罠ᘀᘃ嫩虠ᖋ晡塠㡎ҡᓩ➀Ҩ⥀ᅈ䔈瑠Ⴄ瓣嫩虠ᖍҡ所㙐㰼ᑼ䥀䛘䄈曤晤⛙ᖈᘀ䙀䞈姠⢀橢ҡᖜ㹂⤃䙐Ⴐ䝭䡀㦑▭ᑸ邀ҰҰ硹虨Ⴐ䍊䟜ھ攳满亟ꡐ䇊┰ߜ䡆䛀荰弲鉠ᓑ扠ڶҠ㙁皿玤ڒԒ┰ߘ醡ꡟ朼亀㶄㑴腠ߔ啠ҽ晠ᖀ䩗覱ᖈ晠楟蝋爵橠顰ڨԌ㲀╇㝁盘虩䚄Ⴀ⚥ꍴ䡂㙂㚂厭䡀掙▬晦桟꜡芰拠⎂㙚┰ߘ醡ꡟ朼亀㶄㑴腠ߔ啠ҽ晠ᅀ䩂Һᖩ䉈暀ᄀ藺檠䡀䡈䯩窠ᓁޚ㚱礸Ҧ矘Ҡ鱠Ҭݥ湠溏鴂㙑ұቲ郊㙁皬ⵇ䙀ڙҥᓹ㰀Ԁ晨ݨ㛖睠❉ጮ䙂寨ᓈݨ㥆瞀Ԏ幤Ⴎ昀覇幠Ꮐ㙁▭⠈暡璮陠◟顓噰ႤҾ⥁梮陠ᖠ䙴Ⴀ⭈ڐቨ㛁湠ᛀ䚂◁Ҡ癤ԁᏁ㙈Ҩ㜆瞠■嫢Ⴄ䙐Ҩ䚁晰罠ځ晨暀Ұ曣ԁ塠你㪁炤ᄡᖈ㥈ԍ崂㙈柘桮杠◒滢亁Ⴄ蝨佤仢▰䱐椰䡈㛁Ꭱᖰ晢㚔㙀湡鎤ڒԁԅ窠⡫㙅脨ᆍ崄溂ݠڂቬݥ杰ᖀተ㚠ᖬᘀ䙁䜺䵰ҥԀዸ㝀晢㙙ᯀ椰揳牠ቨߘᖀ桔瓀Ұ䙆蚀ڙҤ普㙘㙀◠柠ޒԒᖅ窢ᰀᆆ晢躓瀼ҡҹᕾ䕠ᒠꞇ迃姀㙁Ԁ㶘ቡᐿ湠◠ᓰ㛁Ҡᚾ杠㙀皢㔄䙤仈کዾ䙁䜿ꡟ蝉地ߑҥቬ䙂姱ݺ躃鵷塨᧤晤条悕皯玡墀㟰☐晤杢悀ꇆ鹠⍂▹Ҡ桨ጠᄀݰڈᖞᙎҠ癤Ԃᐠ暨ڈ㠷⨡▹表暀ᆔݠᖠ塠㛂令ᗀᒐ啰ڑ蠀㡀㽈◐ᖖ桀獀Ҩބڧ㟰■晦䙀䅁ңڡ塠⚠⚤敂骁Ꮑ癨ڤڔ⚋罤⚂邡◕☡歠䙂㙒㩴ᗀᠡޚ◡䩀䡠㻂黠ᏎⳀᣅ湠歠䛂㙉Ұ鉤⫠ႰႭ暡በ䝀♸ᖘ䙄㙀珠杤Ҥ□繨噾⤠ᒐҭ暠ޒҡҬ鉤㹠ተႭ暡በ䝀㜘ᖘ⨸Ⴀ枿詠Ꮐ㜁ᖐᘀጠ㙀■ᛀ䜄嚂ݠݢ㪁▰Ұ䣍䡠⛠■橦䆪㩁Ҩ暡癴□ᖄ㹄⤠Ҵݢᗀ䡀ᄠ◐橢屢ᯐڈچ蚀曀ᖬ晢䙀䛈䃈ڣ塰㹚ݠᴂកႱڐ䣍䡠㾀■橤此䙐ڐ䡍䡐㽀ᘠᖠ䝂ᣐݣ䙁塠偨ߘᖀ⤂䙐Ⴑ䟠ԄႠݠڐቼ䛁䍐揳扠ᓑ▨癤ڇዠ□◂ᖑ䝀㛠ᖠ䙀䥍胨Ԇ蚀Ⴀᛔ䁄⪡ᣐݨԆ蚀Ⴀᖴݣ蛹虠㚸㥸Ң晰ႥꋠԈႮ䐜䴀䙀虨勠ጠᖶႬ■ᛀ䝂㙐㝀晢䙂䅁ᖈڄҳ噰蚌晠杴孴ݠᗀᗐ蹡ҥየ邀һݠᖀበ❐☀㱗剢ݢ䘈虨㩆睰☰ڀᄈႢ☠輀橢Ҫᖑ窢ᒠݴݠᖠ桠㡈ߘᗀ䙂䝀琠襤ԂҲᗡ竌ዤ㙁㚎ⵄڄ☣伄ᖀ嵣Ұݰ䱍䡀䡈䟨硤ԗᆀ■橠棰㙁艬皠ጡ㡵■溅⍁ڰ軠ᘂ㚪㝂■歠䡃噰ݠᗀዩᆌ㐀蝠䩂ҩ䙈◤ᠥ⋀■亁⍂晰Ⴔ䁀䙅▣椨ڤԂ湸䜜ᖀ䙃䛄䃈ݥԀᇰ■晦乢Ұ朢詠㩐❐▰晢杬孴ݠᖠ桠⠈䟨橢乢Ұ枨Ԉ䙃幰Ⴄ㻂ᖐ仱ڑ䛈ᖐ表㚁橠⤠ݰႭ暡በ⚠㬘ᖈ䙁㙁珠晤Ҥ㔤祠ڬቤ㙀■䴀䙂Ҳᛁ粨ҫꆠ暡㘠䩀㡂ᘁቢ㚑㝃Ⴐᖀ誀ᇸҠ晬杸宁ҭ虠በ塨栉ᖀ嵠Ұᆐ䝍䩠ᇸҠ晨ᗀᇠ□亀㳢㚁ҵ㡚ᒠዠ湨ݨ㡄漹ᖜᘀ䙄䛏禡▨㡄▨枤橪歭ᒐᄰ晦陠Ⴀ㭄圴桠䇀Ҩވ㝆硰ߜҠ䙅䛄䃐晦陠Ⴀݠጠዠᖐᄰ䩂ڒҹҴ普㙸Ⳑᄤခ晰罠ݠጠዠᖐ߈ဂڐ罠⭀㔔䝃㙄◡䩀桠憹▰䁀⤋㙃ᖁ衁婲ቨᗁ橠⥁颩噠◃婸ᘞҠ䚢ҫ䛐㚀䡌䙀芘▤⚞䥀䛐䄈曄晠㡁ҡቨ邈Ⴀ☡䩀ᖐ榱䙈ڄᗫ㙁■叄䚤麂ݠڐበ㛁ᒀ䞠䩂ԁҹ窤ዠዤ榠ᖀ穰⨡▰晤䙄㙁㤆誠䩐杠⚤㛖䅡Ⴁ㙈ހ橢Һᗡ竢ᄖႠ■詠秀㛡Ҭ晠乢һݤᆀ㛲Һᖀ鉤㙋㙁湠橠婱ᓐ更晦杨孴ݠᖠ桠㾀▰桤䙃㩁Ұ䙨隤Ⴀݠᗬበ㙀㚁ⵄڃ噰ݠݢ☊㩁Ҩ䛁暀罠㝔䁀䙂㙂ᖘ晡坥癠勠ᗀᗪ㙀湡桧ᇢҢᖡ窤ԀҴݠᖀ贃噰ݠ⋂䚪㡀ᑤڀ㚗齸Ⴄ䜖䡄㡀ݰᖀ㣀㙡▭⠈暡Ⴐ朣ԁ塠⚠⭀ጰቨ㝂湠詠塠傸鋨⍶屢ተڈԅԀႰ㫀⍴屢ҡ㙀湠䩀㡁Ҭ☠䙄㙂熠ҤҲ晰坤ᑨ䡆▵□ᦀҤ▪㹴ᴀᓁᄄ榠䩀椰ҩᖝቢ䝃㙂□䯠ҲԒᖅ誀傀ቶ晠◀㪰蹰噬㳂ځԀ趀繠Ⴂ虠卤Ꮒᄡ粡噠ብ晠罠㛴Ң䙇䛂䍜檀眠◹Ұ癤ᖡᏐݪڀዠ㝀㝄㜔乢һݡᖀ䡀倐□በ䝃ᣐڈԅԀ表ᦈ鉤⪫㙀□䶀ҲҡҬ驠Ԁዠ橺櫠ޙ虰▵ꔄꔣԀ橺誠墠Ҳҩڀԍڄڑ䛈በႠᘀᖠ㕠Ԁ晭暡በቨဈߘ䙀䜚䞰ҥ㙠ᇸ⛐晠栴ԕ㚯㛸Ң湰ߜᖀ䙀䜮Һ溘溼ҡ䩈ڮበ㙀㚹ҭ䩜誎Ҡ硤ԗႠ■ᖀᖘ䙋伀ᖀ䡄紁ခ浀噢ҡ䙉麢កᆐҰ忠⍂㙱繨㺀ځᖵ☡詠硠䝀Ⳅ㼔㙂㙀⥀⻁癲ҡ䩌ڄ◀ᄶ盠霯梀潠䞐䁄䙀㙄琠虤Ԓԑ繨㚀⏀ݰݨڨ㛆盠☠ݢᄚڄڂ詠በ⚠◠䒀ᓁ◕⚠ሡ婸䩦ҡጠ栄检Ҥ⋀ޔ⬌䵀ݢ㾁碤陠ቦ㙀芰▨ᑾᅞᄀݰڈԄҲҩҤ晢䙐ݡ▤Ԕ仈ᘀᏃꙁ廱Ⴑ䟠䡀䡈ꏌ䁆䙂䜿ꡟ衎㡀㡸婰晤杧悶满亀㡀䡈ꑥ辺ꕂ㚄倣䛤ڒҽ屙ᗁ♇⋃■満涢Ԃ媔㒀ዠᇶ㚿ꡟꡐ䂨媁ᒩ㜀Ԁ潰嵲⪠ݡ癠㳃㛎虠㚅躕⚌Ҡ朰Ҷ栘淀Ұ䤨䍈鱠ڀ蹠⥁隧噠◃婿論Ҡ䚨ҫ䜆䨰Ҩ㧴㒄敠Ԁ婠ᦀ螄幠ႤҠ卧辁晠◀Ң躜潬Ҡ杠Ҷ核湀Ұ䮨㺉ᯀڀ蹠⤠Ұߍ暠桠Ⴀ♸ᖀ䙀㙀瓠Ⴁ提▨㠼池枠孱ݩҤҴ◃令◠ᄈႢ㞁▤Ҳ晰ݤᴀጡһݨᖀ䩠❘⬠晤䙂䛌䃍暤桠㡉蠈晦杰孴曠⎀噢Ҳᙁ窠ᓁᖵ⡀晦隐Ⴀ☠ᴒበ䇁灨ڈ㢆睠⚤眴㙎Ⳑݰ䡍䡠㽀♀ᗀ屢Ұݨڅ㙱栘⫠ᘀ䙁㩁Ⴈ月眰Ⴀᛄ㜔乢Ԃ榠ᖀ睠庹Ұ晤佣ᖛ曠ᖀ橰榱Ҭ癤ԖႠᑈҨ䐉䱀ߘᖈ䙀㙂⻀晤Ԅ⠃勰ҷ浡ݡ䘈虨㡆罰⭐Ҥ晢䙐Ұ䛍䣀㙁▰晢醀ᄄ杰ᖀ㡀㦑▨晢潭ႰႰ䙮梀⚠☠ጠጫ⻑ڐ䝄Ҵ◢勌桢ጠ㙂Ⴐᖀ婱榲ᖄ鉤ԀᆐႭ暢桠㽀ހᖀ屢▦ڂ詠婰ᇰ◠㲀ᒠݰߐ䡍䝂坠Ⳅ㜔乢Ұ暨ڥԀ䝈☠ᴐበ䛀矣䙤Ңұ繨ڀځድ■䴀䙀罠Ⳅ朴䩀┥湠企癢ұҤ䜄ҫ◍Ң鹀㙐䈹⪡ጠ醂ႲҠ湠䩂Ңᖑ窰በ㝁湠侀橢Ҫᖁ㡚ዠᇠ暽ᗀ桠⚠㛀Ꮦ䅢ހ桨Ԉ㛄缹ᖄᘀ䙃ዠ■溃⍄▩繨ڀዠᆛݥᖀ䡀ᄠ■鉤㙌ݥ湠満ᓠ㛀勠ᗀᄀᄀ橺桤桠㡈䟨癤ԁݰݪڀ桰㽀♀ᖀ条䥆暨Ҥԓ噰ݠݢᗪ㙀珠晡塠㡉ᇨ湠㕋㙀瞣䙄ԒҨ柨Ҷ㚚ҥ豠暀乒㹂ᘁ粤ᖤԀ暨䛨䏉瑠Ⴇ垓晠㩁Ұ䙭䦠㙀⚠ᘀጠ䜐䷐ҥԀቨᛜ☠栀畀Ұ皐▨ݡ艬ҸႫ䜒䷐Ҩ䂉鑠ހᖀ条孱ᄭ暠በ偨⛌䁂⤠ተߍ暣桠䝀♸ᖰ䙄䜞䬰Ҧ蚁䝀㝆龇晠䅁ᖐ忳䉀ᄠ■橤柟䱆晰忳䉀Ⴀ⚤ᑔ䡂䅁Ұ忳䉀ቮ磇Ҡ乢ұ߁㘨䍉瑠ހᖀ䙄䛄䃈ҤҲ晰暤Ҡ䙄㙂⡀蝦隑Ⴀ㝄䜔䙃㩁ᒄ䙀ᖜ謮Ҡ癤ҥ㙁ᑐ噍䦠㙁ҵቢ獭ݥ晢諀ᖑᓙ▨湠䙂㙀珠柤Ԃҡ繨㙀⦱ݠ朿躀㡐䁈ᘄ▤暀ހ晲ݨᖐႨ⫰ቶᎿ㙁⠀晤䚔亂ݠቨ暀ހ暤⠡暀聨ᖰቶ䙂㩁Ⴈ暨皤Ⴀᖑڀᄡݨ㪃ځ婰☀ᖬ晪䙂䛀湠䡉眒㙒㩑ڀԀݻݡᆀ㛲ҡҨ鉤ᗁҰ杨Ԅ㙰罠ݠ☌በ㙀㚂ⵄԓ噰Ԏ䑂Ⴃ昀暨䚨㙒◀⚠晢杠䩂㙐䙄㙰虨剩ꕀየႠ☡伀橤▩ҥ⠚Ⴚ㙀皠䡊㜀◹Ҩ癤ᖢᄂ杰◀㡀⠨婤媠ᄡݨ㪃ԁ塠你⚤ጠႰ䳅滠漀橢ҡҤ鉤ᖌݥ湠ᖀ䦠㙢ᖀ桨䙁㛁椨Ҥڃ噰ݠݢ☊㙁珠晡彰▨➽ቢ䝃ᄀ■亀ᘀ䡂ᖀ桢⪡ᣁ㙀湠䩀㡀⚠晤乢ұႱ䛈በ⠨婤㹆⤠Ⴔݡᗀ䜐⚠ᖴᖖ条㛁ᒀ蟄ڂҲᖄ晢㚍㝁㞃䙡暀罠ᛄዠ瞂Ⴆ暢詠በ❐▱ቢ䝁ᯀ椨Ҥԃ噰㝄ڂᒋ㙀■贠䙂Ңᖡ窠ᄖႠᑢ蚀㙷齸ႦҢ醂ᆒҨҥԀႨ⚤ڂң䙐Ҩڭ䩟鹣仠ᘂ㖱㝂㚌㒄ڄ㓸ᇨ晨杪䫍瓠ҤҤ⪛令ڀጡዻ☠栀ޒҢᯀᑔ䡂䜀暳蛨በ㡌ҥᓩ㴀Ҩ⩀ᅄҴ㑤腠ݢዠҰߚ源Ҷ硨ݠߖ㙍㙁盀ԍ䢀ڜ乤ቦꚣԀ虠叄䙲䙁Ҡ癤ԁᄀ晨䙀婢ҡҭ竣Ꙁ孰ݰ䠮㡠䡉栨晨林孰Ⴐ䞉㟳癠ݠݢ꜊㛀■満淂㙐婠㲀ځ晠胨暨㹐⡸㝀晤柠ހ鎅繠Ⴂ鹠勠Ꮓ櫶虠㚀橠በ䆒ᯀᑔ杠㙀䄄ᇤԔ⪠ᦈ湠⨢ݠ朿諀ᖑᓙ▤湠䙀㩁Ҩ暨㞆瞠■桦ጠᄟ曰ڈበ㞀▰䉄ҡᆅ湠蠀䩐Ⴈ⚦龇晠ᯀ椨ڡ癲ұ䙈ڄᒨႢ◠橠壠㙀勤ᴀᄀႻݡᖀ㡀㿰■晢栨烀ҨҥԀ䞀◀晠乢ᖈ♠ᅄҴ□繨◠ᄀႻݠᖀ㩛䫦Ҡ晠乢ቴݢᖀᏀ㚀曬ҷᒁݠ蘠湠䩀㡁ҥᓾ꜊䜿暼亀譐䡁ҥᒾ꜊䜿暼亀諰蹩ҥᐠ邂ᇠꞀ咈㛤滈☠ݢ☊㙁⻀晤Ҥ◃仠Ꮓꙁ廻ݠᖀᖐ➐Ҡ䑖䙀㙀皲厧䙀☀◌晠䙁䜔蘺涠Ұ虨勠ڀᒺҠ椨Ҩ㙃癠ԍ豢ᗿ䛀溠蚨በ⛠◀橪条恱ݰ噉䚄Ⴀᘠᖀ䝄㙁Ⴐᖀ䩐☢櫨⋊ⳂᣐҰ䙆蚀杠ݠᗬቤ㙀■贠䙄Ⳅ畠ڐበ㙂□䩀Ⴁ䝀ᛄ♴乢Ң㙈ݢڰ绘务婠⤠ᄀ暤⬀ޖ虨ᨼ池析寱߉ҤԒҩ繨◠ᒠһݠᖀ婱覲ᖈ鉤Ԁᇠ煺溂秀㙁ҭᖄ嵢ᯐߐ坲鉠ᇰ◀晦杵䅁⚨ڤԔ⚣伸ᖰ䙃㙁珠此ԒҺᖑ竌ዠ㙁皢ⵄԁረԍ繢ᅟ㟀㚌⺤䙲䙁Ҭ晢屢ተ߈Ҧ蚀ႠⳄ弴杢䅁Ҩڨ㤆硨笸ᖀ䙃䝁㐀柤Ԕ㕤襠ڬቨ㙁皥䴀䢂ҹҭጠ邖Ⴌ■詠婰䦑繨皠ᒠᆛݨᖀ婰榱Ҩ䚺ҫ屠暿諀ᖓᓙ▬湠䙃㙀珠曤Ԓҡ繨ڀᓁ㑵㚀洠䙂Һᘱ竢㭶Ⴀ■躠䦰㚡ҭᒱ䀀һݢᖀ婱倐☰晦䙃䛐䃍暣በ㽀Ⳅ♴屢㩐߈ڦ蚂ႠⳄ㜔䙂▾晢鏠㙗齸Ⴄ蜶䡃㡀■詠㦠㙡Ҭ晠屢Ұߐ䧍䩐㟰■晦枌宀殭暠በ䁐♼ᖘ䙃䜢䱰Ҧ蚀杠Ⳅ僌ዤ㙁湠躄⍃噰蛠ᴀᓁድ⻀此Ԓҹ繨暠ᓁᖵ■桧癠脀ᖅꕆځ㙵滠櫠በ㝀ހᖀ屢ተݰ䥍䡀⠈栈硤ԗᆀ■溂⍂Ҫᖡ窲በ䇁晨ڄҲ湰ߜᯐ䙂䛂䃈ڈ㛆盠廠ᘂ䚪㡀ᑖ蚀㸲㹂ᙁ粤ᒤҰ߈Ԇ蚀蝠⭀ڬቨ㙁皩ⵈ㙓噰ݠ⋄ᄗႪ■躗澼ҡ繨䚀ᓁ⦻ݫᖀ塠䁉䟨鉤䙠ᆐߐ䝍䦠㞁ҭዠ邀Ⴈ㖀ᅊ晰㨹Ҥ癤ԁႰڐ䙆蚀Ҳݠᖈ暀ݴݡᖠ婰桨㚁䢄ᄥ⋀湠䩀姀㙡Ҥ晤屢ҰҰ惰艠ᇰ▰晠䙁䅁ң蟀ޔ◢ᖐ䜄ҫ䭀ݿ詠㩘ᖆ㙁㑈暡ݰҪڃበ⚠Ⴄ弴乢Ҵݤዠ㙀蹨躌晤此䙠晣蟄Ң晰蛠ᗀᒠԀ浺歠䙂晰嚤■⤋䧀暿諀ᖒᓙ▬湠䙃䛊䃐䙆蚀ႠⳆ龋晠䅁ᖈڨ䙓幰㛀ᴀᄖႮ■詠ᓠ㜁Ҭ晦杸孻ݠᖀ塠㛁驠㳈Ⴂ旰ڊڀ桰㝀ᘠᖀ䝃䛄㚁ቪ㡠⠨㝁ተ杤◑Ң詠㡀㟰▰晢䙃䅁ҨҨ䔉䱀ߘᖈ䙀㙀珠晡姰▫ꌠᏂ㚶䙀◠橠ᖐᇰ◀晠杠㙀盀㙏浲Ҳᨽ⬄Ⴛ䅁ႨҨ㙂Ҳᗁ躠Ⴛ䅁Ң釀㙷齸Ⴄ䜖䡁㡀■ᛀ䜂㙒㩑ݣ狳虠㚊躒澬Ҡ朰Ҷ䙀㩁ቨ曈皤ቮ墯Ҡ枋䜒䭰ҢᓀڙҤ晤屢ᖐڈҦ蚀䝀ᘀ⇬በ㙀橯ҡ妐▫ꌠᖈ暀Ұ朠蹤Ԓҩ婠ڴҠ㙀皠厤㙒Һᖅ窢ᒠᄀ蘺檠䜐ژ勠Ҷ剠ᄀ■●欰䡁ҡ⠈暡ተ晣ځ塠ႠႥꄲ杢恨㪈晡癰繠勠Ҷ慠㙀⠀晤㙂ҩ婠ݢ㚱䛂䏑䛈በ✈ҡጠ鞡ᐻ㞁▤ҢҨ某䑖䙀㙀橪ሡ塠Ⴀᗀ瑶剡ޟ漠◂⍒㙉㙀晢杨孰Ұ䝍䣀㙁繨ڀᄀҴ曠⎀噢Ҩ杤Ҷ剡ޟ漠◂⍒㙉㙀晢杨孰Ұ䝍䣀㙁繨ڀᄀҴ曠⎀噢Ҩ朄Ҷ婡ޟ漠◂⍒㙑㙀晤䙁䅁ᒈڄң噰䛀ᘃ櫵虠⻀曤Ԅ㐤絠ڬበ㙁ᖍ虡塰ႠᖑҦ暀Ԁ普晠በቨᦈ桠䙁䛿胨暁癠纸勼ڀԀҴݡ◀㵒ҫ潤ᚤ屢ተҨԍ䡠Ⴀހᖈ条彻ݡᅅ䙐⪙⪡ዠ醂ݲҨԄң噰䛀Ꮒ䁶Ⴂ■亙⚬ҡ繨ڀႰ䏀ᑊ蚀㸲㹂ᗁ粤ᄄҰڈҥ㙠ᇸ⫠晢杨宀预幠ᖐႠހᖐ㙣ҥ渠ڈበ⠋鞌䁀䙀㙀皡ᖀ䝄轰Ⴔ䁀䙀┥晢詠㙗鹲ݠڐበ㝀瞣䙄Ҥ◃伀ᖀ歭Ұڄခ園Ҩᨼᘀ䙀㩁Ⴈ暈眰ႠႤ㜔乢Ԃ榠ᖀ㝀庸勴ቢꙂ䙐Ҫڀዠ㝀ឌ䁀䙂㙀⠀曭䡀⡨婡ቢ㕋䛀ᑈ虤Ԃұ䙈☢ꕱ䅁ႨҤҴ▫漸ᖈ䙀㙀胨Ԇ蚀ژ鹠晠䙁䛁苭暠桠Ⴀᦈ橠䙀㩁Ⴐ䙮䦠㙠勔ڀᄈႠ㞁■ޒҢ␒⦠ԖႢ■ᖀ㦠㙀勄ቢꚠҴݤᗀ㚇齠ᖔ晠杴孴ݠᅁ垀ቨႤ墠ځޛ䄈Ҩ㠴圸劸ڀԀހ暼洠䚂ҡҥ窠ᄖႠᑄҤҢҫ佥ꗔ杠㙀脼䞡晢ҡҤ晤䙃▥椢虤Ұ䡁Ҡ䙎⤋⚠■ᛀ䙂ҩҤ晤遰㑠晢血በቨ᧰橠杠㙀䄜柁ҢҡҤ䙦⤓ҰҰ揲牠ᇰ▰晠䙁䅁Ң蠀በᅈұቤ鞡ޛᑃ䙄Ң晰㝄⎂条䧅橠ᖀ㡀ᄠ■晠乢ቨጢ螠ᖐႠᇬ晠靫ᣀ■ᦀڄ▻歴㱘ԀҰڐ䚮䦠㙠劔ڀԈႠ■ᛀ䚆皸橡ᒱ㰀Ԁ檰寲艠ݡ癠㱜ԀҴݠᓀ婠虠剠㱖ԀҺ曠ᖀ㝁嚸剠晠䥀孲Ҩ虡圀Ⴀހᖈ柘廥棠ᖀᏀ㙢ᖅ衶⠀㙀⠀柨㙗◸习晠乢ᰀ暽柃㙂ҡҥᔑ䀀Ҵݠᗀᖐ彠ڬ䡀Ҡᣃ晨ҤҶ皸䉀晠䙁寥栠ᖀᖐ榰剼ڀځ投ᑃ䙈喯獗䇺涵ꂞҥ榠◾ꐾ鑭啦瘓嗟ᣆ晰羰廸荬ꇇ⤄ꙋᆀڂ蛀Ұ纽拄በ柠曀Ң鬃㳖駣簰曪飒帙㢛甬㴆熁ሉ资規岔绫璮噠ހڀҴҠҨҠҢ噠ң᧱輪鏐恰䍛詬泷妫㟔朤龀排苻辍跆⥣䯐杀嗒愙荸豌岃怋ᣐ鄨袐㽛瑬錇ᰃᆑ漩猪讓䅙缭匦視堛㬉洬寂㷶䂘璬㵧濛㇝謪嗓徑爼鏭㱶俛䰑煄哒怉Ҥҩ虠ңҴҠ㭀Ҡ㺝㓌紷ᔡሑ蒠諉憔罹䩌䷲ᕓ㰉蒾軏崒爹瑎䲗䇡挙洢飇巷苹卍㵷䧓謝资規娔荺㓬䤦䆻嬔褪觃䅙㒎勬䧖兹蜨貾軅扶牫泅覂ꈻ濬蔸迂㵹䌀ҹ㙁Ң橠ҡ孠ҠᛀҠ⭐ݠᄤҠޕҠҬҠҤҠҡ楆駅徚䂛鐤⇦⥋埵滔䚠㩶㾙瓤ᕓ轣瀅田骉噥▨⻌糇䠑ᆁ暸⠠徔耺㓇䡆ᒀҡҢ㙀㳀Ҡ㇀㝀ڠҠဒႰҠ晠ҥ鳦ꈋ㫽猾飅怚⩋狌㵦懙搩焮迓悙䒋铎䱲ꇛ䰑睊袎堗膫䱬粖㿱潄館袙夑瑬泅鶇击眕浄ꀐ悗熽銎崲迡弬苂嗓徑爼鍬㥢駳牢乢㙀嗠Ҡ⪠㙀ԈҠ߂駓夙䍚呍衦奫䯱焨悀㛹羻ⲅ賆燓䰍眪諴ݨҷ虠Ң皀Ҡ㡀Ҡ灠橠⪀Ҡᑐ㙀ԖҠڊڄҫ陠Ң鉰Ҡ䅀Ҡ䭀䡀ᨰҠᅐ■һҠԅԂҥ鹠ҡ恨Ҡ⻀Ҡ㣀㝀ᑸҠޜᖀҭ晠Ҳ晱ҢꊠҠ蕤Ҡ⍠Ҡ⛠☠ᅜҠڠበҦ虠ҩ䙈晡摠Ҡ团ҠᓠҠᒿ㹥筫哇萙挻淧喴ꏋꏨ䋣⬨ᑍ酖囃韼镢鉨ҠҨҠҡҠҠ㹀ҡ楆駅徚䂛鐤⇦⥋埵滔䙡怒腹氬賶馫琁焨蟓怒苽ⴍ鵂ᒳᦅ缪誚㙲䌝᧭沶鞡䫀ꌚ䚳徑燻Ⰽ裢濛䟽脪嗆帙㾜铥饆䅋濽蒾飅娔茽㒏㤷䇓Ⱍ甲髈愑⦸鑍礳⤫⻌鋄徙墑㒙勇ᒣ㾻瀵赈參徜艽㐥緖⦻嬔蚼妎㻗茼狅鲗㨋栱蕊髉屷䋜虠Ң虸晡灠Ҡ蝠ҠހҠᅛ䟽脪嗆帙㾜铥饆䅋濽蒾飅娔茽㒏㤷䇓Ⱍ甲髈愑⦸鑍礳⤫⻌鋄徙墑㒙勇ᒣ㾻瀵赈參徜艽㐥緖⦻嬔蚼妎㻗茼狅鳦酫Ⱉ譆ބᆈҷ虠Ң蹠Ҡ幠Ҡ硡橠⪀ҠᐠҠҲҠҷ聻鐌祖姛濵赈喎堐苹鑅鶆军䰍轄龏怙㼋鍍㶆樋♙派鎍㻲缸账䧓熃⚅焦庒㿗苽哎椶䇓谡輾受圙膫䱅覒韩搭謦嗃徜艽㐮綦燁怩購鯍夙䂘詭鷆凳㿱蕎䚯堑莼猌楀ҡ㙐䙀譠Ҡᣀ䙀ጠҠݰ◀ڥҠԓ䙠Ҡ■ҡ楆駅徚䂛鐤⇦⥋埵滔䚩墜▯渄⏖凃㻹歊賆夙㸚勯ᯗ䇛㰉輲闎㙳㺚召粣督珵缬哂愓㿙咫鳶䨁နꃠ岔ҠҠҬ㵷䅫瀱社钀妐肻Ⰼ樂ᒁ䟱焬骀㛞湼玌鳧䞋Ԉ暠鋅妚㓈⪬ᑀ督瀅田骚㙰㹀ңڑҡ婠Ҡ步■ᒀҠᛐ仠ҤҠԏ徚茽⬥鲖㟹篥滊諂㹙㐎⇬秦㟁漨謬诅㿛Ⲙ贌觃䅱菴謦貕坷腺劮䱗㨉揭蕄讏怙㼋铍泶䅩搕蔨哒忠Ҡ⻀睠ᎨҠڈᒀҤ晠Ҭ㵷䅫瀱社钀妐肻Ⰼ樂ᒣ琰茸诎㩔湯渄⏗㥙怑焼争㷴䈛包鳆ꈳ㰍躾哃圙䀛豎䲖憫琱譒嗓徑爹鎎泧共忭蔺厑夑缭沧㧖䥑诵泐墓㷹䎜铥粗㨋栱蒺鷁怖熬᧦奃✛琩沾角挘䍛锎泶蟓瀬ҠနᏈҹ䙀Ҭ㙀Ҡ⠀Ҡ㷴䈛包鳆ꈳ㰍躾哃圙䀛豎䲖憫琱譒嗓徑爹鎎泧共忭蔺厑夑缭沧㧖䥑诵泐墓㷹䎜铥粗㨋栱蒺鷁怖熬᧦奃✛琩沾駃徜艽᧮䵰Ҡᇰ⫠ڡҠҸ虠ҡ㙀ҡ繬㙀因Ҡ⺠ҠတҠߘᯐԐ晠ұҠҠ橠Ҡ鉦■㺀Ҡ═ҠݰҠڡ怙羼瓭㴶靣㿅礸评䍐䋈╤ᒀᓠ㺀߂Ҡڑ晠ҡ㙀ң᧭贪飔嬗臨Ⲍ㳖見㜨杀䙾㙘һ߂Ҧ■Ң湠ҠᘀҠ⫮嶖凳砅蔼䚦圔腹勧䡆觛䎽芠撀㹀䅁桠ᯐҠᏔҠҩҠҸ哎岷㧣䯽芠賁嬖㾙␄Ꮖ觛䎽芠蟓㙺茺喬磲ሡል祔访帓㓎淮綖爳㬸皲䙪㙜һ߂Ҧ■Ң牠ҠᘀҠ⫮嶖凳砅蔼䚦圔腹勧䡂槃揽攼䚡忰䎜鎏䲒潡雡誠傀㻛һ߂Ҧ■ңᯀҠᘀҠ⫮嶖凳砅蔼䚦圔腹勧䡇㝁仡蚠技㹼Ⳍᯆᒃᆁ栐⫠ڡҠԒ䙀Ҡ湠ҡ㤜鳁岔罨⡬嶇燣盡蜢飁崒荹咮奀ң噸䙀蝠Ҡ喠ҠᄰҠᇰ⫠ڡҠԍ虠ҡ习ҡ繬㙀因Ҡ㱠ҠވҠ߂駓夙䍚呍衦奫䯱焨悀帚荼㓮楆見开碠撀㹀һ߂Ҧ■ң桠ҠᏀҠݠҠڀҠҨҠҢ晠Ҡ虠ң᧭贪飔嬗臨Ⲍ㳖見㜨朦䙾㙘⩚㐭粲ꇓ搩煆骏㵱纼獍饗㥫䏥赈飙㷹苸豌鳷䦃篨茦闍㳘羸鋆覃瀫㟈餪覘㽙爼甎嶢酻灅蝈閍成茻䯦ᑣ㾱欝资規庑䄙Ⲇ䤧㧟犀䙀蝠Ҡ㭀ҠڐҠᄡᘖ檦㽐䌚喬硦覫尅躠诘堒羹Ⰼ楀┸䚀߂ҠԑҠҤ䙀ҡ朤諆媕䅛瑮劌䱶䥫䂀㡠ҨҠҡҠҠ䙀Ҡ㡀ҠᛀҠᅀҠڀҠҠҠҠ晠ҡ晠ң⻅缸评㙰㨜㓍㴶頱逵荎飁年⡘ᖍ鵂ᒉᆁ䌞铅噰䏘叮粶覫➉楄龏怚㽋铎䱲ꈣᦙ礦釉嶓燼瓀㖰滠ڰҠဋݠҧ虠ү庨晠幠Ҡ鱠晠ᕀҠڨҠԀҠҢҠҡ虠Ҡ扠Ҡ■ҠበҠڀҠڀҠұҠҤ晠Ҡ虠Ҡ■Ҡ✠ҠႠҠڀҠҨҠҪҠҭ泶㧓᧩颾蟌岗缫铎䱲ꈳ᧽敌诃㵹䌘銎ᯖ䆋硄朾鳅従䅛镀Ҡᕠ亠ԘҠҬ曠Ҡ癠ҥ隈䙀ҠҠᯀҠҠҠҤҠҹҠҺ听沷杣搵躠闆㙱䈝听涓督码炠鋅嵰䂜詤ᰇ刁ሑ眪䚩嶒㾞ᖍ㵲Ҡᓐ㩠ԀҠԝᄢҡ㙀ҡ缲裒圙䒋鋍鶆俛琩沾賍恷臽吅趇㹀蚌䙀䅀Ҡ㾀ҠᄠҠ߁雀嚐㻘⭌⇦ᓃᇩ朸蛎嚘㹜犬ᰆ㥓㟉猤軂宑䅘琬䵆㧓㟁漤諄墓㽚⭍䲆覃忱蜨飆嚓㻙独賆妣㿩猸賎妘㿜獬⋆㦃㟡猰軈宔䅚㐍⎦槳信笤郄宓䃚ⵍ䳦観怉蜴飌嚖㻛⭍泆覣堉缸鋎岘䅜琬⎆㦳㟹猼軎宗䅛琭赦駳柡蜤雄库䉚㑍䵆解怡蝀飒嚙㻜狮䲧㦃瀉謸风徘䋜苸听鲲ᔛ知譈䚩嶒㾞ᖄ⎗刁ᇽ犠飁嶓羨ⲍ鶂ᔛ堅洪䚯奰䅙听鶦杠Ҡ䉘㙀⚠Ҡᖁ杠ႰҠင蟎娒湹听桦燓㟕隠穬■ᖀҠበ蛠ݨҠڳ岔缹䩍㴦䥫蛡赈蟒悙湸哤ቦ㧫盡焼諓㙰荨Ү朡Ҡ繠ҡ⠌■ᓀ㖡㵇㦻㠕洪飓Ⴄ䅘听鶶⤻㩄♄鯓恠ᒜ㒍鲖击珵溺裙ᆂ苽哎沑迩弴蚼嚀㩱续贌㲃冃☠諀墑㳘⭋䱦Ꮠ娛ᦑ譊饦㹗⬎᧦߇慫琔脤迎墓羻梦ᑣ㞱茠暰袖㿚玸貦饢ɯ";

const wasmBinary = base32768.decode(base32768WASM);

scryptPromise = WebAssembly.instantiate(wasmBinary, {}).then(instantiatedModule => {
  const wasm = instantiatedModule.instance.exports;

  
  let WASM_VECTOR_LEN = 0;
  
  let cachegetUint8Memory0 = null;
  function getUint8Memory0() {
      if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
          cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
      }
      return cachegetUint8Memory0;
  }
  
  const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;
  
  let cachedTextEncoder = new lTextEncoder('utf-8');
  
  const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
      ? function (arg, view) {
      return cachedTextEncoder.encodeInto(arg, view);
  }
      : function (arg, view) {
      const buf = cachedTextEncoder.encode(arg);
      view.set(buf);
      return {
          read: arg.length,
          written: buf.length
      };
  });
  
  function passStringToWasm0(arg, malloc, realloc) {
  
      if (realloc === undefined) {
          const buf = cachedTextEncoder.encode(arg);
          const ptr = malloc(buf.length);
          getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
          WASM_VECTOR_LEN = buf.length;
          return ptr;
      }
  
      let len = arg.length;
      let ptr = malloc(len);
  
      const mem = getUint8Memory0();
  
      let offset = 0;
  
      for (; offset < len; offset++) {
          const code = arg.charCodeAt(offset);
          if (code > 0x7F) break;
          mem[ptr + offset] = code;
      }
  
      if (offset !== len) {
          if (offset !== 0) {
              arg = arg.slice(offset);
          }
          ptr = realloc(ptr, len, len = offset + arg.length * 3);
          const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
          const ret = encodeString(arg, view);
  
          offset += ret.written;
      }
  
      WASM_VECTOR_LEN = offset;
      return ptr;
  }
  
  let cachegetInt32Memory0 = null;
  function getInt32Memory0() {
      if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
          cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
      }
      return cachegetInt32Memory0;
  }
  
  const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;
  
  let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });
  
  cachedTextDecoder.decode();
  
  function getStringFromWasm0(ptr, len) {
      return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
  }
  /**
  * @param {string} password
  * @param {string} salt
  * @param {number} n
  * @param {number} r
  * @param {number} p
  * @param {number} dklen
  * @returns {string}
  */
  scrypt = function(password, salt, n, r, p, dklen) {
      try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          var ptr0 = passStringToWasm0(password, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
          var len0 = WASM_VECTOR_LEN;
          var ptr1 = passStringToWasm0(salt, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
          var len1 = WASM_VECTOR_LEN;
          wasm.scrypt(retptr, ptr0, len0, ptr1, len1, n, r, p, dklen);
          var r0 = getInt32Memory0()[retptr / 4 + 0];
          var r1 = getInt32Memory0()[retptr / 4 + 1];
          return getStringFromWasm0(r0, r1);
      } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
          wasm.__wbindgen_free(r0, r1);
      }
  }
  
  
});
