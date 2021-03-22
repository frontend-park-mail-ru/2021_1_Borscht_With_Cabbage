export const renderPreview = window.Handlebars.compile(`
    <div class="input-avatar__preview" id="profile-preview">
        <div class="input-avatar__preview-remove">&times;</div>
     
        <img src="{{src}}" alt="{{name}}"/>
        <div class="input-avatar__preview-info">
            <span>{{name}}</span>
            {{size}}
        </div>  
    </div>
`)