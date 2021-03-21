export const renderPreview = window.Handlebars.compile(`
    <div class="preview" id="profile--preview">
        <div class="preview-remove">&times;</div>
     
        <img src="{{src}}" alt="{{name}}"/>
        <div class="preview--info">
            <span>{{name}}</span>
            {{size}}
        </div>  
    </div>
`)
