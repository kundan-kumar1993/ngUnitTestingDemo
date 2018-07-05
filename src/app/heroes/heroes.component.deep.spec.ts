import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../hero.service";
import { of } from "rxjs/observable/of";
import { By } from "@angular/platform-browser";
import { NO_ERRORS_SCHEMA, Directive, Input } from "@angular/core";
import { HeroComponent } from "../hero/hero.component";

@Directive({
    selector: '[routerLink]',
    host: { '(click)': 'onClick()' }
})

export class RouterLinkDirectiveStub {
    @Input('routerLink') linkParams: any;
    navigatedTo: any = null;

    onClick() {
        this.navigatedTo = this.linkParams;
    }
}

describe('HeroesComponent (Deep Tests)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

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
                HeroComponent,
                RouterLinkDirectiveStub
            ],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
            // schemas: [NO_ERRORS_SCHEMA]
        })
        fixture = TestBed.createComponent(HeroesComponent);
    })

    it('should render each hero as a HeroComponent', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        // Run ngOnInit
        fixture.detectChanges();

        const heroComponetDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponetDEs.length).toEqual(3);

        for (let i = 0; i < heroComponetDEs.length; i++) {
            expect(heroComponetDEs[i].componentInstance.hero).toEqual(HEROES[i]);
        }
    })

    // Testing DOM interaction and Routing Components.
    it(`should call heroService.deleteHero when the Hero Component's
        delete button is clicked`, () => {
            spyOn(fixture.componentInstance, 'delete');
            mockHeroService.getHeroes.and.returnValue(of(HEROES));

            fixture.detectChanges();

            // Triggering Events on Elements
            const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
            heroComponents[0].query(By.css('button'))
                .triggerEventHandler('click', { stopPropagation: () => { } });

            expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
        })

    // Testing DOM interaction and Routing Components second approach.
    it(`should call heroService.deleteHero when the Hero Component's
    delete event emitted`, () => {
            spyOn(fixture.componentInstance, 'delete');
            mockHeroService.getHeroes.and.returnValue(of(HEROES));

            fixture.detectChanges();

            // Emetting Events from Children
            const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
            (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);

            expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
        })

    // Testing DOM interaction and Routing Components third approach.
    it(`should call heroService.deleteHero when the Hero Component's
    delete event emitted`, () => {
            spyOn(fixture.componentInstance, 'delete');
            mockHeroService.getHeroes.and.returnValue(of(HEROES));

            fixture.detectChanges();

            // Raising Events on Child Directives
            const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
            heroComponents[0].triggerEventHandler('delete', null);

            expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
        })

    it('should add a ner Hero to the Hero list when the add button is clicked', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const name = 'Mr. Sunil';

        // Interacting with input Boxes
        mockHeroService.addHero.and.returnValue(of({ id: 5, name: name, strength: 200 }));
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

        inputElement.value = name;
        addButton.triggerEventHandler('click', null);
        fixture.detectChanges();

        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
        expect(heroText).toContain(name);
    })

    it('should have the correct route for the first hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

        // Testing the routerLink with trigger click event.
        let routerLink = heroComponents[0]
            .query(By.directive(RouterLinkDirectiveStub))
            .injector.get(RouterLinkDirectiveStub);

        heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

        expect(routerLink.navigatedTo).toBe('/detail/1');
    })
})
