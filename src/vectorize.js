/**
 * Vectorize a given string
 * 
 * @param {string} input
 * 
 * @returns {array}
 */
function vectorize(input) {
    input = input.toString().toLowerCase();

    var output = [];
    var dictionary = ["&gt", "&lt","&l","<",">","[(]","[)]","[;]","[`]","[']","[.]","[$]"," ", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z","aa","ba","ca","da","ea","fa","ga","ha","ia","ja","ka","la","ma","na","oa","pa","qa","ra","sa","ta","ua","va","wa","xa","ya","za","~a",">a","<a",";a","}a","{a",":a","\"a","'a","`a","=a","ab","bb","cb","db","eb","fb","gb","hb","ib","jb","kb","lb","mb","nb","ob","pb","qb","rb","sb","tb","ub","vb","wb","xb","yb","zb","~b",">b","<b",";b","}b","{b",":b","\"b","'b","`b","=b","ac","bc","cc","dc","ec","fc","gc","hc","ic","jc","kc","lc","mc","nc","oc","pc","qc","rc","sc","tc","uc","vc","wc","xc","yc","zc","~c",">c","<c",";c","}c","{c",":c","\"c","'c","`c","=c","ad","bd","cd","dd","ed","fd","gd","hd","id","jd","kd","ld","md","nd","od","pd","qd","rd","sd","td","ud","vd","wd","xd","yd","zd","~d",">d","<d",";d","}d","{d",":d","\"d","'d","`d","=d","ae","be","ce","de","ee","fe","ge","he","ie","je","ke","le","me","ne","oe","pe","qe","re","se","te","ue","ve","we","xe","ye","ze","~e",">e","<e",";e","}e","{e",":e","\"e","'e","`e","=e","af","bf","cf","df","ef","ff","gf","hf","if","jf","kf","lf","mf","nf","of","pf","qf","rf","sf","tf","uf","vf","wf","xf","yf","zf","~f",">f","<f",";f","}f","{f",":f","\"f","'f","`f","=f","ag","bg","cg","dg","eg","fg","gg","hg","ig","jg","kg","lg","mg","ng","og","pg","qg","rg","sg","tg","ug","vg","wg","xg","yg","zg","~g",">g","<g",";g","}g","{g",":g","\"g","'g","`g","=g","ah","bh","ch","dh","eh","fh","gh","hh","ih","jh","kh","lh","mh","nh","oh","ph","qh","rh","sh","th","uh","vh","wh","xh","yh","zh","~h",">h","<h",";h","}h","{h",":h","\"h","'h","`h","=h","ai","bi","ci","di","ei","fi","gi","hi","ii","ji","ki","li","mi","ni","oi","pi","qi","ri","si","ti","ui","vi","wi","xi","yi","zi","~i",">i","<i",";i","}i","{i",":i","\"i","'i","`i","=i","aj","bj","cj","dj","ej","fj","gj","hj","ij","jj","kj","lj","mj","nj","oj","pj","qj","rj","sj","tj","uj","vj","wj","xj","yj","zj","~j",">j","<j",";j","}j","{j",":j","\"j","'j","`j","=j","ak","bk","ck","dk","ek","fk","gk","hk","ik","jk","kk","lk","mk","nk","ok","pk","qk","rk","sk","tk","uk","vk","wk","xk","yk","zk","~k",">k","<k",";k","}k","{k",":k","\"k","'k","`k","=k","al","bl","cl","dl","el","fl","gl","hl","il","jl","kl","ll","ml","nl","ol","pl","ql","rl","sl","tl","ul","vl","wl","xl","yl","zl","~l",">l","<l",";l","}l","{l",":l","\"l","'l","`l","=l","am","bm","cm","dm","em","fm","gm","hm","im","jm","km","lm","mm","nm","om","pm","qm","rm","sm","tm","um","vm","wm","xm","ym","zm","~m",">m","<m",";m","}m","{m",":m","\"m","'m","`m","=m","an","bn","cn","dn","en","fn","gn","hn","in","jn","kn","ln","mn","nn","on","pn","qn","rn","sn","tn","un","vn","wn","xn","yn","zn","~n",">n","<n",";n","}n","{n",":n","\"n","'n","`n","=n","ao","bo","co","do","eo","fo","go","ho","io","jo","ko","lo","mo","no","oo","po","qo","ro","so","to","uo","vo","wo","xo","yo","zo","~o",">o","<o",";o","}o","{o",":o","\"o","'o","`o","=o","ap","bp","cp","dp","ep","fp","gp","hp","ip","jp","kp","lp","mp","np","op","pp","qp","rp","sp","tp","up","vp","wp","xp","yp","zp","~p",">p","<p",";p","}p","{p",":p","\"p","'p","`p","=p","aq","bq","cq","dq","eq","fq","gq","hq","iq","jq","kq","lq","mq","nq","oq","pq","qq","rq","sq","tq","uq","vq","wq","xq","yq","zq","~q",">q","<q",";q","}q","{q",":q","\"q","'q","`q","=q","ar","br","cr","dr","er","fr","gr","hr","ir","jr","kr","lr","mr","nr","or","pr","qr","rr","sr","tr","ur","vr","wr","xr","yr","zr","~r",">r","<r",";r","}r","{r",":r","\"r","'r","`r","=r","as","bs","cs","ds","es","fs","gs","hs","is","js","ks","ls","ms","ns","os","ps","qs","rs","ss","ts","us","vs","ws","xs","ys","zs","~s",">s","<s",";s","}s","{s",":s","\"s","'s","`s","=s","at","bt","ct","dt","et","ft","gt","ht","it","jt","kt","lt","mt","nt","ot","pt","qt","rt","st","tt","ut","vt","wt","xt","yt","zt","~t",">t","<t",";t","}t","{t",":t","\"t","'t","`t","=t","au","bu","cu","du","eu","fu","gu","hu","iu","ju","ku","lu","mu","nu","ou","pu","qu","ru","su","tu","uu","vu","wu","xu","yu","zu","~u",">u","<u",";u","}u","{u",":u","\"u","'u","`u","=u","av","bv","cv","dv","ev","fv","gv","hv","iv","jv","kv","lv","mv","nv","ov","pv","qv","rv","sv","tv","uv","vv","wv","xv","yv","zv","~v",">v","<v",";v","}v","{v",":v","\"v","'v","`v","=v","aw","bw","cw","dw","ew","fw","gw","hw","iw","jw","kw","lw","mw","nw","ow","pw","qw","rw","sw","tw","uw","vw","ww","xw","yw","zw","~w",">w","<w",";w","}w","{w",":w","\"w","'w","`w","=w","ax","bx","cx","dx","ex","fx","gx","hx","ix","jx","kx","lx","mx","nx","ox","px","qx","rx","sx","tx","ux","vx","wx","xx","yx","zx","~x",">x","<x",";x","}x","{x",":x","\"x","'x","`x","=x","ay","by","cy","dy","ey","fy","gy","hy","iy","jy","ky","ly","my","ny","oy","py","qy","ry","sy","ty","uy","vy","wy","xy","yy","zy","~y",">y","<y",";y","}y","{y",":y","\"y","'y","`y","=y","az","bz","cz","dz","ez","fz","gz","hz","iz","jz","kz","lz","mz","nz","oz","pz","qz","rz","sz","tz","uz","vz","wz","xz","yz","zz","~z",">z","<z",";z","}z","{z",":z","\"z","'z","`z","=z","a~","b~","c~","d~","e~","f~","g~","h~","i~","j~","k~","l~","m~","n~","o~","p~","q~","r~","s~","t~","u~","v~","w~","x~","y~","z~","~~",">~","<~",";~","}~","{~",":~","\"~","'~","`~","=~","a>","b>","c>","d>","e>","f>","g>","h>","i>","j>","k>","l>","m>","n>","o>","p>","q>","r>","s>","t>","u>","v>","w>","x>","y>","z>","~>",">>","<>",";>","}>","{>",":>","\">","'>","`>","=>","a<","b<","c<","d<","e<","f<","g<","h<","i<","j<","k<","l<","m<","n<","o<","p<","q<","r<","s<","t<","u<","v<","w<","x<","y<","z<","~<","><","<<",";<","}<","{<",":<","\"<","'<","`<","=<","a;","b;","c;","d;","e;","f;","g;","h;","i;","j;","k;","l;","m;","n;","o;","p;","q;","r;","s;","t;","u;","v;","w;","x;","y;","z;","~;",">;","<;",";;","};","{;",":;","\";","';","`;","=;","a}","b}","c}","d}","e}","f}","g}","h}","i}","j}","k}","l}","m}","n}","o}","p}","q}","r}","s}","t}","u}","v}","w}","x}","y}","z}","~}",">}","<}",";}","}}","{}",":}","\"}","'}","`}","=}","a{","b{","c{","d{","e{","f{","g{","h{","i{","j{","k{","l{","m{","n{","o{","p{","q{","r{","s{","t{","u{","v{","w{","x{","y{","z{","~{",">{","<{",";{","}{","{{",":{","\"{","'{","`{","={","a:","b:","c:","d:","e:","f:","g:","h:","i:","j:","k:","l:","m:","n:","o:","p:","q:","r:","s:","t:","u:","v:","w:","x:","y:","z:","~:",">:","<:",";:","}:","{:","::","\":","':","`:","=:","a\"","b\"","c\"","d\"","e\"","f\"","g\"","h\"","i\"","j\"","k\"","l\"","m\"","n\"","o\"","p\"","q\"","r\"","s\"","t\"","u\"","v\"","w\"","x\"","y\"","z\"","~\"",">\"","<\"",";\"","}\"","{\"",":\"","\"\"","'\"","`\"","=\"","a'","b'","c'","d'","e'","f'","g'","h'","i'","j'","k'","l'","m'","n'","o'","p'","q'","r'","s'","t'","u'","v'","w'","x'","y'","z'","~'",">'","<'",";'","}'","{'",":'","\"'","''","`'","='","a`","b`","c`","d`","e`","f`","g`","h`","i`","j`","k`","l`","m`","n`","o`","p`","q`","r`","s`","t`","u`","v`","w`","x`","y`","z`","~`",">`","<`",";`","}`","{`",":`","\"`","'`","``","=`","a=","b=","c=","d=","e=","f=","g=","h=","i=","j=","k=","l=","m=","n=","o=","p=","q=","r=","s=","t=","u=","v=","w=","x=","y=","z=","~=",">=","<=",";=","}=","{=",":=","\"=","'=","`=","=="];

    dictionary.forEach( char_group => {
        var regex = new RegExp(char_group,'gim');
        var matches = input.match(regex);
        var output_cell = (matches) ? matches.length/dictionary.length : -1;
        output.push(output_cell);
    });

    return output;
}

module.exports = vectorize