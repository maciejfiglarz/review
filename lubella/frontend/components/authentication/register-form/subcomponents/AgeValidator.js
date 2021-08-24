import { Fragment, h, render } from 'preact';
import { useEffect } from 'preact/hooks';

const AgeValidator = ({ ageRef: ref, isValidAge, setIsValidAge, agreementRef1,agreementRef2, isAgreement ,setIsAgreement }) => {

    useEffect(() => {
        setIsAgreement(false);
    }, [isValidAge])


    return (
        <div class="age--validator">
            <div class="label">Czy masz ukończone 16 lat?**</div>
            <div onClick={() => setIsValidAge(true)} class={`btn--primary -mb15 ${typeof isValidAge == "boolean" && isValidAge ? "-not-selected" : ""}`}>Tak</div>
            {(typeof isValidAge === 'boolean' && isValidAge) && (
                <div ref={agreementRef1} class="checkbox--component">
                    <input type="checkbox" class="input" id="agreement1" onClick={() => setIsAgreement(!isAgreement)} checked={isAgreement} />
                    <label for="agreement1" class="label">
                        <span
                            class="text">Oświadczam, że zapoznałem/am się z treścią regulaminu,
                            w tym z zawartą w nim informacją o przetwarzaniu moich danych osobowych i akceptuję jego postanowienia.*</span>
                    </label>
                    <div class="error"></div>
                </div>

            )}
            <div onClick={() => setIsValidAge(false)} class={`btn--primary -mb15 ${typeof isValidAge == "boolean" && !isValidAge ? "-not-selected" : ""}`}>Nie</div>
            {(typeof isValidAge === 'boolean' && !isValidAge) && (
                <div ref={agreementRef2} class="checkbox--component">
                    <input type="checkbox" class="input" id="agreement1" onClick={() => setIsAgreement(!isAgreement)} checked={isAgreement} />
                    <label for="agreement1" class="label">
                        <span
                            class="text">Oświadczam, że zapoznałem/am się z treścią regulaminu,
                            w tym z zawartą w nim informacją o przetwarzaniu danych osobowych mojego dziecka i akceptuję jego postanowienia.*</span>
                    </label>
                    <div class="error"></div>
                </div>

            )}
            <div ref={ref}>
            <div class="error"></div>
            </div>


            <div class="info">**Jeśli nie masz ukończonych 13 lat poproś osobę
   dorosłą o utworzenie konta gracza</div>
        </div>
    )
}

export default AgeValidator;