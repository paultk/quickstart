export class User {
  constructor(
    public brukerId?: number,
    public passordId?: number,
    public stillingsId?: number,
    public telefonNr?: number,
    public stillingsProsent?: number,
    public timelonn?: number,
    public admin?: boolean,
    public fornavn?: string,
    public etternavn?: string,
    public epost?: string,
    public avdelingId?: number,
    public plaintextPassord?: string,
    public fodselsdato?: string,
    public adresse?: string,
    public by?: string,
    public hash?: string,
    public salt?: string
  ){}
}


/*
 this.brukerId = brukerId;
 this.passordId = passordId;
 this.stillingsId = stillingsId;
 this.telefonNr = telefonNr;
 this.stillingsProsent = stillingsProsent;
 this.timelonn = timelonn;
 this.admin = admin;
 this.fornavn = fornavn;
 this.etternavn = etternavn;
 this.epost = epost;
 this.avdelingId = avdelingId;
 this.plaintextPassord = plaintextPassord;

private int brukerId, passordId, stillingsId, avdelingId, telefonNr, stillingsProsent;
private double timelonn;
private boolean admin;
private String fornavn, etternavn, epost;
private String plaintextPassord;
private String hash;
private String salt;
*/
