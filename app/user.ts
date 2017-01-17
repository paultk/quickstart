export class User {
  constructor(
    public epost: string,
    public id?: number,
    public fornavn?: string,
    public etternavn?: string,
    public fodselsdato?: string,
    public telefonNr?: number,
    public adresse?: string,
    public by?: string,
    public stillingsId?: number,
    public stillingsprosent?: number,
    public avdelingId?: number,
    public timelonn?: number,
    public admin?: boolean,
    public passord?: string,
  ){}
}
