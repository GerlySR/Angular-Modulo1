export class DestinoViaje {

  private selected: boolean;
  public servicios:string[];
 
  constructor(public nombre: string, public u: string, public votes:number=0) {
    this.servicios= ['pileta','desayuno'];
  }
  isSelected(): boolean {
    return this.selected;
  }
  setSelected(s:boolean) {
    this.selected = s;
  }
  voteDown() {
    this.votes--;
}
voteUp() {
    this.votes++;
}
}
