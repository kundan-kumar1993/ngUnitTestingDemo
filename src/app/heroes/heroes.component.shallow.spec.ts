import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../hero.service";
import { Component, Input } from "@angular/core";
import { of } from "rxjs/observable/of";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";

describe('HeroesComponent (Shallow Tests)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    @Component({
        selector: 'app-hero',
        template: '<div></div>'
    })
    
    class FakeHeroComponent {
        @Input() hero: Hero;
    }
    
    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'KundanRai', strength: 11 },
            { id: 2, name: 'VipanRana', strength: 10 },
            { id: 3, name: 'Jaggi', strength: 11 }
        ]

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                FakeHeroComponent
            ],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
        })
        fixture = TestBed.createComponent(HeroesComponent);
    })

    it('should set hero correctly from the service', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.componentInstance.heroes.length).toBe(3);
    })

    it('should create one li for each hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    })
})
