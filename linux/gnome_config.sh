if gsettings set org.gnome.shell.extensions.dash-to-dock dock-fixed == true:
	gsettings set org.gnome.shell.extensions.dash-to-dock dock-fixed false
else:
	 gsettings set org.gnome.shell.extensions.dash-to-dock dock-fixed true

	 
gsettings set org.gnome.shell.extensions.dash-to-dock pressure-threshold 1000