export class User {

  public email: string;
  public name: string;
  public avatar: string;
  public description?: string;

  constructor(public id: number, private _token: string, private _tokenExpirationDate: Date) { }

  public get token(): string {
    if (!this._tokenExpirationDate || this._tokenExpirationDate <= new Date())
      return null;
    return this._token
  }


}
