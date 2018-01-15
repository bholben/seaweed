import { Component } from '@angular/core';

@Component({
  template: `
    <div padding>
      <strong>A phrase...</strong>
      <p>...is case sensitive</p>
      <p>...can be multiple words</p>
      <p>...can include any keyboard characters</p>
    </div>
  `,
  styles: [`
    p {
      margin-left: 10px;
    }
  `],
})
export class PhraseInfoPopover {}
