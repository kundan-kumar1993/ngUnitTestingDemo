import { ComponentFixture, TestBed, fakeAsync } from "@angular/core/testing";
import { HeroDetailComponent } from "./hero-detail.component";
import { HeroService } from "../hero.service";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { of } from "rxjs/observable/of";
import { FormsModule } from "@angular/forms";

describe('HeroDetailComponent', () => {
    let fixture: ComponentFixture<HeroDetailComponent>;
    let mockActivatedRoute;
    let mockHeroService
    let mockLocation;

    beforeEach(() => {
        mockActivatedRoute = {
            snapshot: { paramMap: { get: () => { return 3; } } }
        }
        
        mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
        mockLocation = jasmine.createSpyObj(['back']);

        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [HeroDetailComponent],
            providers: [
                { provide: ActivatedRoute, userValue: mockActivatedRoute },
                { provide: HeroService, userValue: mockHeroService },
                { provide: Location, userValue: mockLocation }
            ]
        });
        fixture = TestBed.createComponent(HeroDetailComponent);
        mockHeroService.getHero.and.returnValue(of({ id: 3, name: 'SuperDude', strength: 100 }));
    });

    it('should render hero name in a h2 tag', () => {
        // fixture.detectChanges();
        // expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
    })

    it('should call updateHero when save is called', fakeAsync(() => {
        // mockHeroService.updateHero.and.returnValue(of({}));
        // fixture.detectChanges();

        // fixture.componentInstance.save();

        // fixture.whenStable().then(() => {
        //     expect(mockHeroService.updateHero).toHaveBeenCalled();
        // })
    }))
});