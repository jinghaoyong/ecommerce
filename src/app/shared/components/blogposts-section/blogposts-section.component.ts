import { Component } from '@angular/core';
import { BlogpostCardComponent } from "../blogpost-card/blogpost-card.component";

@Component({
    selector: 'app-blogposts-section',
    standalone: true,
    templateUrl: './blogposts-section.component.html',
    styleUrl: './blogposts-section.component.scss',
    imports: [BlogpostCardComponent]
})
export class BlogpostsSectionComponent {

}
